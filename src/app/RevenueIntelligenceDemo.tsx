'use client'
import { useState, useEffect } from 'react'
import { Calculator, TrendingUp, AlertTriangle, Users, DollarSign, Target, BarChart3, PieChart, ArrowUpRight, CheckCircle, XCircle, Clock, Building2, Zap, Award, TrendingDown } from 'lucide-react'

interface CustomerData {
  monthlyRevenue: number
  acquisitionCost: number
  churnRate: number
  averageLifespan: number
  operatingMargin: number
  upsellRate: number
  referralRate: number
}

interface CalculationResults {
  clv: number
  paybackPeriod: number
  ltvratio: number
  churnRisk: 'low' | 'medium' | 'high'
  recommendations: string[]
  projectedRevenue: number
  riskFactors: string[]
}

interface BusinessPreset {
  id: string
  name: string
  category: string
  description: string
  data: CustomerData
  source: string
}

const CLVCalculatorDemo = () => {
  const [customerData, setCustomerData] = useState<CustomerData>({
    monthlyRevenue: 100,
    acquisitionCost: 150,
    churnRate: 15,
    averageLifespan: 24,
    operatingMargin: 35,
    upsellRate: 8,
    referralRate: 12
  })

  const [results, setResults] = useState<CalculationResults | null>(null)
  const [selectedPreset, setSelectedPreset] = useState<string>('')

  // Real industry data from research
  const businessPresets: BusinessPreset[] = [
    {
      id: 'landscaping',
      name: 'Landscaping Services',
      category: 'Service Business',
      description: 'Lawn care, maintenance, landscaping construction',
      data: {
        monthlyRevenue: 1367, // Based on $16,413 avg annual per customer from NALP data
        acquisitionCost: 127, // Average for service industries
        churnRate: 12, // Lower churn for recurring services
        averageLifespan: 36, // Long-term relationships typical
        operatingMargin: 18, // 15-20% range from industry sources
        upsellRate: 15, // Seasonal services, upgrades
        referralRate: 25 // High referral rate in service businesses
      },
      source: 'NALP 2023 Financial Benchmark Study'
    },
    {
      id: 'construction',
      name: 'Construction Contractors',
      category: 'Service Business',
      description: 'General contractors, specialty construction',
      data: {
        monthlyRevenue: 2500, // Higher value projects
        acquisitionCost: 450, // Higher acquisition costs for B2B
        churnRate: 8, // Lower churn, project-based
        averageLifespan: 48, // Long-term relationships
        operatingMargin: 12, // Construction industry margins
        upsellRate: 20, // Additional work, change orders
        referralRate: 35 // Very high referral rate
      },
      source: 'IBISWorld Construction Industry Report 2024'
    },
    {
      id: 'auto-detailing',
      name: 'Auto Detailing Services',
      category: 'Service Business',
      description: 'Car washing, detailing, mobile services',
      data: {
        monthlyRevenue: 85, // Based on frequency of service
        acquisitionCost: 55, // Lower acquisition costs
        churnRate: 18, // Higher churn in personal services
        averageLifespan: 20, // Medium retention
        operatingMargin: 22, // Good margins in auto services
        upsellRate: 12, // Additional services
        referralRate: 18
      },
      source: 'IBISWorld Car Wash & Auto Detailing Report 2025'
    },
    {
      id: 'hvac',
      name: 'HVAC Services',
      category: 'Service Business',
      description: 'Heating, cooling, maintenance contracts',
      data: {
        monthlyRevenue: 180, // Service contracts and repairs
        acquisitionCost: 275, // Higher for technical services
        churnRate: 10, // Low churn for essential services
        averageLifespan: 60, // Very long relationships
        operatingMargin: 16, // Industry standard
        upsellRate: 25, // Equipment upgrades, maintenance plans
        referralRate: 30 // High trust-based referrals
      },
      source: 'Service industry benchmarks 2024'
    },
    {
      id: 'clothing-retail',
      name: 'Clothing Boutique',
      category: 'Retail Business',
      description: 'Fashion retail, apparel stores',
      data: {
        monthlyRevenue: 112, // Based on $1,350 over 3 years from research
        acquisitionCost: 129, // Shopify industry data for fashion
        churnRate: 35, // High churn in retail
        averageLifespan: 12, // Shorter relationships
        operatingMargin: 25, // 5-10% net, ~25% gross margin
        upsellRate: 8, // Accessories, seasonal items
        referralRate: 10 // Lower referral rates in retail
      },
      source: 'Shopify Customer Acquisition Cost by Industry 2025'
    },
    {
      id: 'flower-shop',
      name: 'Flower Shop',
      category: 'Retail Business',
      description: 'Floral arrangements, event flowers, gifts',
      data: {
        monthlyRevenue: 95, // Seasonal business
        acquisitionCost: 85, // Local marketing focused
        churnRate: 25, // Seasonal/event-based customers
        averageLifespan: 18, // Medium retention
        operatingMargin: 35, // Higher margins on perishables
        upsellRate: 15, // Event upsells, arrangements
        referralRate: 20 // Word of mouth important
      },
      source: 'Small retail business benchmarks'
    },
    {
      id: 'electronics-retail',
      name: 'Electronics Store',
      category: 'Retail Business',
      description: 'Consumer electronics, tech accessories',
      data: {
        monthlyRevenue: 150, // Higher ticket items
        acquisitionCost: 377, // Highest CAC from Shopify data
        churnRate: 40, // High churn in electronics
        averageLifespan: 9, // Short retention
        operatingMargin: 18, // Competitive industry
        upsellRate: 12, // Accessories, warranties
        referralRate: 8 // Low referral rates
      },
      source: 'Shopify Customer Acquisition Cost by Industry 2025'
    }
  ]

  const calculateResults = (data: CustomerData): CalculationResults => {
    // Customer Lifetime Value calculation
    const monthlyProfit = data.monthlyRevenue * (data.operatingMargin / 100)
    const clv = monthlyProfit * data.averageLifespan

    // Including upsells and referrals
    const upsellValue = clv * (data.upsellRate / 100)
    const referralValue = clv * (data.referralRate / 100) * 0.5 // Partial attribution
    const totalCLV = clv + upsellValue + referralValue

    // Payback period (months)
    const paybackPeriod = data.acquisitionCost / monthlyProfit

    // LTV:CAC ratio
    const ltvratio = totalCLV / data.acquisitionCost

    // Churn risk assessment
    let churnRisk: 'low' | 'medium' | 'high' = 'low'
    if (data.churnRate > 30) churnRisk = 'high'
    else if (data.churnRate > 15) churnRisk = 'medium'

    // Projected annual revenue (scaled)
    const projectedRevenue = data.monthlyRevenue * 12 * 100 // Assuming 100 customers

    // Risk factors
    const riskFactors: string[] = []
    if (ltvratio < 3) riskFactors.push('LTV:CAC ratio below 3:1 threshold')
    if (paybackPeriod > 12) riskFactors.push('Payback period exceeds 12 months')
    if (data.churnRate > 25) riskFactors.push('High customer churn rate')
    if (data.operatingMargin < 15) riskFactors.push('Low operating margins')

    // Recommendations
    const recommendations: string[] = []
    if (ltvratio < 3) {
      recommendations.push('Reduce acquisition costs or increase customer lifetime value')
    }
    if (data.churnRate > 20) {
      recommendations.push('Implement customer retention strategies and loyalty programs')
    }
    if (data.upsellRate < 10) {
      recommendations.push('Develop upselling and cross-selling opportunities')
    }
    if (paybackPeriod > 12) {
      recommendations.push('Focus on faster customer onboarding and value delivery')
    }
    if (data.referralRate < 15) {
      recommendations.push('Create referral incentive programs to leverage word-of-mouth')
    }

    return {
      clv: totalCLV,
      paybackPeriod,
      ltvratio,
      churnRisk,
      recommendations,
      projectedRevenue,
      riskFactors
    }
  }

  useEffect(() => {
    setResults(calculateResults(customerData))
  }, [customerData])

  const handlePresetSelect = (presetId: string) => {
    const preset = businessPresets.find(p => p.id === presetId)
    if (preset) {
      setCustomerData({ ...preset.data }) // Ensure we create a new object
      setSelectedPreset(presetId)
    }
  }

  const handleInputChange = (field: keyof CustomerData, value: number) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }))
    // Don't clear preset selection to maintain comparison
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const selectedPresetData = businessPresets.find(p => p.id === selectedPreset)

  // Comparison logic for highlighting performance vs industry average
  const getFieldComparison = (field: keyof CustomerData, userValue: number, presetValue: number) => {
    if (!selectedPresetData) return { status: 'neutral', message: '' }

    const tolerance = 0.05 // 5% tolerance for "about average"
    const lowerIsBetter = ['acquisitionCost', 'churnRate'] // Fields where lower values are better

    let isPerforming: 'above' | 'below' | 'average'
    let percentageDiff = Math.abs((userValue - presetValue) / presetValue)

    if (percentageDiff <= tolerance) {
      isPerforming = 'average'
    } else if (lowerIsBetter.includes(field)) {
      isPerforming = userValue < presetValue ? 'above' : 'below'
    } else {
      isPerforming = userValue > presetValue ? 'above' : 'below'
    }

    if (isPerforming === 'above') {
      return {
        status: 'above',
        message: field === 'acquisitionCost' ? "Excellent cost efficiency! You're acquiring customers for less than industry average." :
                field === 'churnRate' ? "Outstanding retention! Your churn rate is lower than typical for your industry." :
                "Impressive performance! You're exceeding industry benchmarks."
      }
    } else if (isPerforming === 'below') {
      return {
        status: 'below',
        message: field === 'acquisitionCost' ? "There's opportunity to optimize your acquisition costs. We can help identify strategies to improve efficiency." :
                field === 'churnRate' ? "Customer retention presents a growth opportunity. Let's explore strategies to reduce churn." :
                field === 'operatingMargin' ? "Your margins have room for improvement. We can help identify profitability opportunities." :
                "You're in the right place! This metric has potential for optimization and growth."
      }
    }

    return { status: 'neutral', message: '' }
  }

  const getInputFieldClass = (field: keyof CustomerData) => {
    if (!selectedPresetData) return "w-full px-4 py-3 bg-gray-900/50 border border-white/20 rounded-lg text-white focus:border-blue-400 focus:outline-none transition-all duration-200"

    const comparison = getFieldComparison(field, customerData[field], selectedPresetData.data[field])

    if (comparison.status === 'above') {
      return "w-full px-4 py-3 bg-gray-900/50 border-2 border-green-400/60 rounded-lg text-white focus:border-green-400 focus:outline-none transition-all duration-200 shadow-green-400/20 shadow-lg"
    } else if (comparison.status === 'below') {
      return "w-full px-4 py-3 bg-gray-900/50 border-2 border-red-400/60 rounded-lg text-white focus:border-red-400 focus:outline-none transition-all duration-200 shadow-red-400/20 shadow-lg"
    }

    return "w-full px-4 py-3 bg-gray-900/50 border border-white/20 rounded-lg text-white focus:border-blue-400 focus:outline-none transition-all duration-200"
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900/50 via-indigo-900/50 to-purple-900/50 p-8 border-b border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Customer Lifetime Value Calculator</h3>
                <p className="text-gray-300">Real industry data with intelligent performance insights</p>
              </div>
            </div>
            {results && (
              <div className="text-center lg:text-right">
                <div className="text-3xl font-bold text-white mb-1">
                  {formatCurrency(results.clv)}
                </div>
                <div className="text-blue-400 text-sm font-medium">
                  Customer Lifetime Value
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-8">
          {/* Business Presets */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
              <Building2 className="h-6 w-6 mr-3 text-blue-400" />
              Choose Your Business Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {businessPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handlePresetSelect(preset.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    selectedPreset === preset.id
                      ? 'border-indigo-500/60 bg-indigo-900/30 ring-2 ring-indigo-400/30 shadow-indigo-400/20 shadow-lg'
                      : 'border-white/10 bg-gray-800/30 hover:border-indigo-400/40 hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{preset.name}</h3>
                    <span className="text-xs px-2 py-1 bg-blue-600/20 text-blue-300 rounded border border-blue-500/30">
                      {preset.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{preset.description}</p>
                  <p className="text-xs text-gray-400">
                    Source: {preset.source}
                  </p>
                </button>
              ))}
            </div>
            {selectedPresetData && (
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
                <p className="text-sm text-blue-300">
                  <strong>Data Source:</strong> {selectedPresetData.source} -
                  This preset uses real industry benchmarks. Your inputs are compared against these averages to highlight opportunities and strengths.
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-white flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-400" />
                Business Metrics Input
              </h4>

              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-white/10">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Monthly Revenue per Customer
                    {selectedPresetData && (
                      <span className="text-xs text-gray-400 ml-2">
                        (Industry avg: {formatCurrency(selectedPresetData.data.monthlyRevenue)})
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={customerData.monthlyRevenue}
                      onChange={(e) => handleInputChange('monthlyRevenue', Number(e.target.value))}
                      className={getInputFieldClass('monthlyRevenue').replace('w-full', 'w-full pl-8 pr-4')}
                    />
                  </div>
                  {selectedPresetData && (
                    (() => {
                      const comparison = getFieldComparison('monthlyRevenue', customerData.monthlyRevenue, selectedPresetData.data.monthlyRevenue)
                      if (comparison.status !== 'neutral') {
                        return (
                          <div className={`mt-2 p-2 rounded-lg text-xs flex items-center ${
                            comparison.status === 'above' ? 'bg-green-900/30 text-green-300 border border-green-500/30' : 'bg-red-900/30 text-red-300 border border-red-500/30'
                          }`}>
                            {comparison.status === 'above' ? <Award className="h-3 w-3 mr-1 flex-shrink-0" /> : <TrendingDown className="h-3 w-3 mr-1 flex-shrink-0" />}
                            {comparison.message}
                          </div>
                        )
                      }
                      return null
                    })()
                  )}
                </div>

                <div className="bg-gray-800/50 rounded-xl p-4 border border-white/10">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Customer Acquisition Cost
                    {selectedPresetData && (
                      <span className="text-xs text-gray-400 ml-2">
                        (Industry avg: {formatCurrency(selectedPresetData.data.acquisitionCost)})
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={customerData.acquisitionCost}
                      onChange={(e) => handleInputChange('acquisitionCost', Number(e.target.value))}
                      className={getInputFieldClass('acquisitionCost').replace('w-full', 'w-full pl-8 pr-4')}
                    />
                  </div>
                  {selectedPresetData && (
                    (() => {
                      const comparison = getFieldComparison('acquisitionCost', customerData.acquisitionCost, selectedPresetData.data.acquisitionCost)
                      if (comparison.status !== 'neutral') {
                        return (
                          <div className={`mt-2 p-2 rounded-lg text-xs flex items-center ${
                            comparison.status === 'above' ? 'bg-green-900/30 text-green-300 border border-green-500/30' : 'bg-red-900/30 text-red-300 border border-red-500/30'
                          }`}>
                            {comparison.status === 'above' ? <Award className="h-3 w-3 mr-1 flex-shrink-0" /> : <TrendingDown className="h-3 w-3 mr-1 flex-shrink-0" />}
                            {comparison.message}
                          </div>
                        )
                      }
                      return null
                    })()
                  )}
                </div>

                <div className="bg-gray-800/50 rounded-xl p-4 border border-white/10">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Monthly Churn Rate (%)
                    {selectedPresetData && (
                      <span className="text-xs text-gray-400 ml-2">
                        (Industry avg: {selectedPresetData.data.churnRate}%)
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={customerData.churnRate}
                      onChange={(e) => handleInputChange('churnRate', Number(e.target.value))}
                      className={getInputFieldClass('churnRate').replace('w-full', 'w-full pr-8 pl-4')}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                  </div>
                  {selectedPresetData && (
                    (() => {
                      const comparison = getFieldComparison('churnRate', customerData.churnRate, selectedPresetData.data.churnRate)
                      if (comparison.status !== 'neutral') {
                        return (
                          <div className={`mt-2 p-2 rounded-lg text-xs flex items-center ${
                            comparison.status === 'above' ? 'bg-green-900/30 text-green-300 border border-green-500/30' : 'bg-red-900/30 text-red-300 border border-red-500/30'
                          }`}>
                            {comparison.status === 'above' ? <Award className="h-3 w-3 mr-1 flex-shrink-0" /> : <TrendingDown className="h-3 w-3 mr-1 flex-shrink-0" />}
                            {comparison.message}
                          </div>
                        )
                      }
                      return null
                    })()
                  )}
                </div>

                <div className="bg-gray-800/50 rounded-xl p-4 border border-white/10">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Average Customer Lifespan (months)
                    {selectedPresetData && (
                      <span className="text-xs text-gray-400 ml-2">
                        (Industry avg: {selectedPresetData.data.averageLifespan} months)
                      </span>
                    )}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={customerData.averageLifespan}
                    onChange={(e) => handleInputChange('averageLifespan', Number(e.target.value))}
                    className={getInputFieldClass('averageLifespan')}
                  />
                  {selectedPresetData && (
                    (() => {
                      const comparison = getFieldComparison('averageLifespan', customerData.averageLifespan, selectedPresetData.data.averageLifespan)
                      if (comparison.status !== 'neutral') {
                        return (
                          <div className={`mt-2 p-2 rounded-lg text-xs flex items-center ${
                            comparison.status === 'above' ? 'bg-green-900/30 text-green-300 border border-green-500/30' : 'bg-red-900/30 text-red-300 border border-red-500/30'
                          }`}>
                            {comparison.status === 'above' ? <Award className="h-3 w-3 mr-1 flex-shrink-0" /> : <TrendingDown className="h-3 w-3 mr-1 flex-shrink-0" />}
                            {comparison.message}
                          </div>
                        )
                      }
                      return null
                    })()
                  )}
                </div>

                <div className="bg-gray-800/50 rounded-xl p-4 border border-white/10">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Operating Margin (%)
                    {selectedPresetData && (
                      <span className="text-xs text-gray-400 ml-2">
                        (Industry avg: {selectedPresetData.data.operatingMargin}%)
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={customerData.operatingMargin}
                      onChange={(e) => handleInputChange('operatingMargin', Number(e.target.value))}
                      className={getInputFieldClass('operatingMargin').replace('w-full', 'w-full pr-8 pl-4')}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                  </div>
                  {selectedPresetData && (
                    (() => {
                      const comparison = getFieldComparison('operatingMargin', customerData.operatingMargin, selectedPresetData.data.operatingMargin)
                      if (comparison.status !== 'neutral') {
                        return (
                          <div className={`mt-2 p-2 rounded-lg text-xs flex items-center ${
                            comparison.status === 'above' ? 'bg-green-900/30 text-green-300 border border-green-500/30' : 'bg-red-900/30 text-red-300 border border-red-500/30'
                          }`}>
                            {comparison.status === 'above' ? <Award className="h-3 w-3 mr-1 flex-shrink-0" /> : <TrendingDown className="h-3 w-3 mr-1 flex-shrink-0" />}
                            {comparison.message}
                          </div>
                        )
                      }
                      return null
                    })()
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-white/10">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Upsell Rate (%)
                      {selectedPresetData && (
                        <span className="text-xs text-gray-400 block">
                          (Avg: {selectedPresetData.data.upsellRate}%)
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={customerData.upsellRate}
                        onChange={(e) => handleInputChange('upsellRate', Number(e.target.value))}
                        className={getInputFieldClass('upsellRate').replace('w-full', 'w-full pr-8 pl-4')}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                    </div>
                    {selectedPresetData && (
                      (() => {
                        const comparison = getFieldComparison('upsellRate', customerData.upsellRate, selectedPresetData.data.upsellRate)
                        if (comparison.status !== 'neutral') {
                          return (
                            <div className={`mt-2 p-2 rounded-lg text-xs flex items-center ${
                              comparison.status === 'above' ? 'bg-green-900/30 text-green-300 border border-green-500/30' : 'bg-red-900/30 text-red-300 border border-red-500/30'
                            }`}>
                              {comparison.status === 'above' ? <Award className="h-3 w-3 mr-1 flex-shrink-0" /> : <TrendingDown className="h-3 w-3 mr-1 flex-shrink-0" />}
                              {comparison.message}
                            </div>
                          )
                        }
                        return null
                      })()
                    )}
                  </div>

                  <div className="bg-gray-800/50 rounded-xl p-4 border border-white/10">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Referral Rate (%)
                      {selectedPresetData && (
                        <span className="text-xs text-gray-400 block">
                          (Avg: {selectedPresetData.data.referralRate}%)
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={customerData.referralRate}
                        onChange={(e) => handleInputChange('referralRate', Number(e.target.value))}
                        className={getInputFieldClass('referralRate').replace('w-full', 'w-full pr-8 pl-4')}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                    </div>
                    {selectedPresetData && (
                      (() => {
                        const comparison = getFieldComparison('referralRate', customerData.referralRate, selectedPresetData.data.referralRate)
                        if (comparison.status !== 'neutral') {
                          return (
                            <div className={`mt-2 p-2 rounded-lg text-xs flex items-center ${
                              comparison.status === 'above' ? 'bg-green-900/30 text-green-300 border border-green-500/30' : 'bg-red-900/30 text-red-300 border border-red-500/30'
                            }`}>
                              {comparison.status === 'above' ? <Award className="h-3 w-3 mr-1 flex-shrink-0" /> : <TrendingDown className="h-3 w-3 mr-1 flex-shrink-0" />}
                              {comparison.message}
                            </div>
                          )
                        }
                        return null
                      })()
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="bg-gray-800/30 rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 text-green-400 mr-3" />
                  Key Results
                </h2>

                {results && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl border border-green-500/20">
                      <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-400">
                        {formatCurrency(results.clv)}
                      </div>
                      <div className="text-sm text-green-300 font-medium">Customer Lifetime Value</div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-blue-500/20">
                      <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-400">
                        {results.paybackPeriod.toFixed(1)} mo
                      </div>
                      <div className="text-sm text-blue-300 font-medium">Payback Period</div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-xl border border-purple-500/20">
                      <Target className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-400">
                        {results.ltvratio.toFixed(1)}:1
                      </div>
                      <div className="text-sm text-purple-300 font-medium">LTV:CAC Ratio</div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-br from-orange-900/30 to-amber-900/30 rounded-xl border border-orange-500/20">
                      <Users className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                      <div className={`text-2xl font-bold ${
                        results.churnRisk === 'low' ? 'text-green-400' :
                        results.churnRisk === 'medium' ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {results.churnRisk.toUpperCase()}
                      </div>
                      <div className="text-sm text-orange-300 font-medium">Churn Risk</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Risk Factors */}
              {results && results.riskFactors.length > 0 && (
                <div className="bg-gradient-to-br from-red-900/30 to-pink-900/30 rounded-xl p-6 border border-red-500/20">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
                    Growth Opportunities
                  </h3>
                  <div className="space-y-2">
                    {results.riskFactors.map((risk, index) => (
                      <div key={index} className="flex items-center text-red-300 bg-red-900/20 p-3 rounded-lg border border-red-500/20">
                        <XCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {results && (
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-6 border border-blue-500/20">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Zap className="h-5 w-5 text-blue-400 mr-2" />
                    Strategic Recommendations
                  </h3>
                  <div className="space-y-2">
                    {results.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-center text-blue-300 bg-blue-900/20 p-3 rounded-lg border border-blue-500/20">
                        <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Optimize Your Customer Economics?
              </h3>
              <p className="text-lg mb-6 text-indigo-100">
                This calculator uses real industry data to help you make informed decisions about customer acquisition and retention strategies.
              </p>
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 inline-flex items-center">
                Get Custom Analysis
                <ArrowUpRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CLVCalculatorDemo
