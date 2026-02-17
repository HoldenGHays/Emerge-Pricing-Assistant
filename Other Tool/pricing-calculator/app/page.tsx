"use client"

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { pricingData, type PricingDataRow, type MarketplaceResult, type SaaSResult } from "@/lib/pricing-data"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// ThemeToggle is now in layout.tsx, so no need to import here

interface Results {
coreMarketplace: MarketplaceResult
coreSaaS: SaaSResult
proMarketplace: MarketplaceResult
proSaaS: SaaSResult
}

const formatCurrency = (value: number) => {
return new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}).format(value)
}

const formatPercentage = (value: number) => {
return new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(value)
}

const formatSalesPrice = (value: number) => {
const monthlyRevenue = value / 12;
const roundedValue = Math.ceil((monthlyRevenue + 1) / 100) * 100 - 1;
return new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}).format(roundedValue);
}

const SLIDER_MIN = 1000000;

export default function PricingCalculator() {
const [numericSpend, setNumericSpend] = useState(125000000)
const [results, setResults] = useState<Results | null>(null)
const [selectedModel, setSelectedModel] = useState<'Marketplace' | 'SaaS'>('Marketplace');

const [inputType, setInputType] = useState<'spend' | 'volume'>('spend');
const [spendValue, setSpendValue] = useState<number | string>('');
const [spendUnit, setSpendUnit] = useState<string>('1000000'); // Default to Millions
const [volumeValue, setVolumeValue] = useState<number | string>('');
const [volumePeriod, setVolumePeriod] = useState<string>('12'); // Default to Monthly

const findClosestRow = useCallback((spend: number): PricingDataRow => {
  return pricingData.reduce((prev, curr) => {
    return (Math.abs(curr.annual_freight_spend - spend) < Math.abs(prev.annual_freight_spend - spend) ? curr : prev);
  });
}, []);

useEffect(() => {
  let calculatedSpend = 0;
  if (inputType === 'spend') {
    const value = Number(spendValue) || 0;
    const unit = Number(spendUnit) || 1000000;
    calculatedSpend = value * unit;
  } else { // inputType === 'volume'
    const value = Number(volumeValue) || 0;
    const periodMultiplier = Number(volumePeriod) || 12;
    calculatedSpend = value * 1700 * periodMultiplier;
  }
  setNumericSpend(calculatedSpend);
}, [inputType, spendValue, spendUnit, volumeValue, volumePeriod]);

useEffect(() => {
  if (numericSpend >= SLIDER_MIN) {
    const closestRow = findClosestRow(numericSpend);
    setResults({
      coreMarketplace: closestRow.coreMarketplace,
      coreSaaS: closestRow.coreSaaS,
      proMarketplace: closestRow.proMarketplace,
      proSaaS: closestRow.proSaaS,
    });
  } else {
    setResults(null);
  }
}, [numericSpend, findClosestRow]);

const handleNumericInputChange = (setter: React.Dispatch<React.SetStateAction<string | number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.replace(/[^0-9]/g, "");
  setter(value);
};

return (
  <div> {/* Removed outer div styling, now handled by layout.tsx */}
    <header className="mb-10 text-center">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
        ProcureOS Pricing Calculator
      </h1>
    </header>

    <Card className="mb-8 border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm rounded-lg">
      <CardContent className="pt-6 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <Tabs defaultValue="spend" onValueChange={(value) => setInputType(value as 'spend' | 'volume')} className="mb-4">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50">
              <TabsTrigger 
                value="spend" 
                className="data-[state=active]:bg-white data-[state=active]:text-slate-900 dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50 dark:data-[state=active]:shadow-sm"
              >
                Revenue
              </TabsTrigger>
              <TabsTrigger 
                value="volume" 
                className="data-[state=active]:bg-white data-[state=active]:text-slate-900 dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50 dark:data-[state=active]:shadow-sm"
              >
                Volume
              </TabsTrigger>
            </TabsList>
            <TabsContent value="spend" className="mt-4">
              <Label htmlFor="annual-freight-spend" className="mb-2 block text-slate-900 dark:text-slate-300">What is the customer's annual freight spend?</Label>
              <div className="flex gap-2">
                <Input
                  id="annual-freight-spend"
                  type="text"
                  value={spendValue}
                  onChange={handleNumericInputChange(setSpendValue)}
                  className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 h-10 px-4 py-2 border bg-transparent border-slate-300 dark:border-slate-700 rounded-md focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-slate-300 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                />
                <Select value={spendUnit} onValueChange={setSpendUnit}>
                  <SelectTrigger className="w-[180px] h-10 border-slate-300 dark:border-slate-700 bg-transparent">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000">Thousands</SelectItem>
                    <SelectItem value="1000000">Millions</SelectItem>
                    <SelectItem value="1000000000">Billions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            <TabsContent value="volume" className="mt-4">
              <Label htmlFor="estimated-volume" className="mb-2 block text-slate-900 dark:text-slate-300">What is the customer's estimated volume?</Label>
              <div className="flex gap-2">
                <Input
                  id="estimated-volume"
                  type="text"
                  value={volumeValue}
                  onChange={handleNumericInputChange(setVolumeValue)}
                  placeholder="e.g. 100"
                  className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 h-10 px-4 py-2 border bg-transparent border-slate-300 dark:border-slate-700 rounded-md focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-slate-300 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                />
                <Select value={volumePeriod} onValueChange={setVolumePeriod}>
                  <SelectTrigger className="w-[180px] h-10 border-slate-300 dark:border-slate-700 bg-transparent">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="365">Daily</SelectItem>
                    <SelectItem value="52">Weekly</SelectItem>
                    <SelectItem value="12">Monthly</SelectItem>
                    <SelectItem value="4">Quarterly</SelectItem>
                    <SelectItem value="1">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-4 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">Calculated Annual Freight Spend</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{formatCurrency(numericSpend)}</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <div className="flex justify-center mb-8">
      <Tabs defaultValue="Marketplace" className="w-[400px]" onValueChange={(value) => setSelectedModel(value as 'Marketplace' | 'SaaS')}>
        <TabsList className="grid w-full grid-cols-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50">
          <TabsTrigger 
            value="Marketplace" 
            className="data-[state=active]:bg-white data-[state=active]:text-slate-900 dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50 dark:data-[state=active]:shadow-sm"
          >
            Marketplace Model
          </TabsTrigger>
          <TabsTrigger 
            value="SaaS" 
            className="data-[state=active]:bg-white data-[state=active]:text-slate-900 dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50 dark:data-[state=active]:shadow-sm"
          >
            SaaS Model
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>

    {results ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductCard models={{
          Marketplace: results.coreMarketplace,
          SaaS: results.coreSaaS
        }} isPro={false} selectedModel={selectedModel} />
        <ProductCard models={{
          Marketplace: results.proMarketplace,
          SaaS: results.proSaaS
        }} isPro={true} selectedModel={selectedModel} />
      </div>
    ) : (
      <div className="text-center py-16 border rounded-lg shadow-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <p className="text-slate-400 dark:text-slate-500">Enter a valid Annual Freight Spend to see calculations.</p>
      </div>
    )}
  </div>
)
}

function ProductCard({ models, isPro, selectedModel }: { models: { Marketplace: MarketplaceResult, SaaS: SaaSResult }, isPro: boolean, selectedModel: 'Marketplace' | 'SaaS' }) {
return (
  <Card className={`overflow-hidden border shadow-sm rounded-lg bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800`}>
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-slate-50">
        <span>ProcureOS</span>
        <Badge variant="secondary" className="bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700">
          {isPro ? "Pro" : "Core"}
        </Badge>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      {selectedModel === 'Marketplace' && (
        <ModelDetails 
          data={models.Marketplace} 
          isPro={isPro}
        />
      )}
      {selectedModel === 'SaaS' && (
        <ModelDetails 
          data={models.SaaS} 
          isPro={isPro}
        />
      )}
    </CardContent>
  </Card>
)
}

function ModelDetails({ data, isPro }: { data: MarketplaceResult | SaaSResult, isPro: boolean }) {
const isMarketplace = 'target' in data;

return (
  <div className="p-4">
    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
      {isMarketplace && (
        <>
          <MetricItem 
            label="Marketplace Revenue"
            value={formatCurrency(data.target)}
            isPro={isPro}
          />
          <MetricItem
            label="% of Wallet Share"
            value={formatPercentage(data.targetPercentage)}
            isPro={isPro}
          />
          {data.saasAddOn !== undefined && (
            <MetricItem 
              label="Annual SaaS Add-On" 
              value={formatCurrency(data.saasAddOn)}
              isPro={isPro}
            />
          )}
        </>
      )}
      {'revenue' in data && (
        <>
          <MetricItem
            label="SaaS Revenue"
            value={formatCurrency(data.revenue)}
            isPro={isPro}
          />
          
        </>
      )}
      <MetricItem 
        label="Expected GP" 
        value={formatCurrency(data.expectedGP)}
        isPro={isPro}
      />
      <MetricItem 
        label="Expected CM" 
        value={formatCurrency(data.expectedCM)}
        isPro={isPro}
      />
    </div>
  </div>
)
}

function MetricItem({ label, value, isPro }: { label: string, value: string, isPro: boolean }) {
return (
  <div className="flex items-start gap-2">
    <div className="flex-1">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="font-bold text-lg text-slate-900 dark:text-slate-50">{value}</p>
    </div>
  </div>
)
}
