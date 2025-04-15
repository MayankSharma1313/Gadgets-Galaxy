
// import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

// import {

//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"
// import { Colors } from "@/constants/colors"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
// import { TrendingUp } from "lucide-react"
// import { useEffect, useState } from "react"
// import useErrorLogout from "../../hooks/use-error-logout"

// const chartData = [
//   { month: "January", mouse: 186, keyboard: 80,headset: 50 },
//   { month: "February", mouse: 305, keyboard: 200,headset: 50 },
//   { month: "March", mouse: 237, keyboard: 120,headset: 50 },
//   { month: "April", mouse: 73, keyboard: 190,headset: 50 },
//   { month: "May", mouse: 209, keyboard: 130,headset: 50 },
//   { month: "June", mouse: 214, keyboard: 140,headset: 50 },
// ]

// const chartConfig = {
//   mouse: {
//     label: "Desktop",
//     color: Colors.customGray
//   },
//   keyboard: {
//     label: "Mobile",
//     color: Colors.customYellow
//   },
//   headset: {
//     label: "Headset",
//     color: Colors.customIsabelline,
//   },
// } 

// export function Chart1() {

//    const [metrics, setMetrics] = useState([]);
//     const { handleErrorLogout } = useErrorLogout();
  
//     useEffect(() => {
//       const getMetrics = async () => {
//         try {
//           const res = await axios.get(
//             import.meta.env.VITE_API_URL + "/get-metrics",
//             {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//               },
//             }
//           );
  
//           const { data } = await res.data;
//           console.log("hii "+data);
          
//           setMetrics(data);
//         } catch (error) {
//           handleErrorLogout(error);
//         }
//       };
//       getMetrics();
//     }, []);



//   return (
//     <Card className="flex-1 rounded-xl bg-muted/50 md:min-h-min">
//     <CardHeader>
//       <CardTitle>Bar chart - Multiple</CardTitle>
//       <CardDescription>January - June 2025</CardDescription>
//     </CardHeader> 
//     <CardContent>
//     <ChartContainer config={chartConfig} >
//       <BarChart accessibilityLayer data={chartData}>
//         <CartesianGrid vertical={false} />
//         <XAxis
//           dataKey="month"
//           tickLine={false}
//           tickMargin={10}
//           axisLine={false}
//           tickFormatter={(value) => value.slice(0, 3)}
//         />
//         <ChartTooltip content={<ChartTooltipContent />} />
//         <Bar dataKey="mouse" fill="var(--color-mouse)" radius={4} />
//         <Bar dataKey="keyboard" fill="var(--color-keyboard)" radius={4} />
//         <Bar dataKey="headset" fill="var(--color-headset)" radius={4} />
//       </BarChart>
//     </ChartContainer>
//     <CardFooter className="flex flex-col gap-2 text-sm">
//       <div className="flex gap-2 font-medium leading-none">
//         Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//       </div>
//       <div className="leading-none text-muted-foreground">
//         Showing total visitors for the last 6 months.
//       </div>
//     </CardFooter>
//     </CardContent>
//     </Card>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Colors } from "@/constants/colors"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { TrendingUp } from "lucide-react"
import axios from "axios"
import useErrorLogout from "../../hooks/use-error-logout"

const chartConfig = {
  Mouse: {
    label: "Mouse",
    color: Colors.customGray,
  },
  Keyboard: {
    label: "Keyboard",
    color: Colors.customYellow,
  },
  Headset: {
    label: "Headset",
    color: Colors.customIsabelline,
  },
  Monitor: {
    label: "Monitor",
    color: Colors.customSky, // <- You can add this to your colors
  },
}

export function Chart1() {
  const [chartData, setChartData] = useState([])
  const { handleErrorLogout } = useErrorLogout()
  const [metrics, setMetrics] = useState({});


  useEffect(() => {
    const getMetrics = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/get-metrics",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
  
        const { sixMonthsBarChartData, ...restMetrics } = res.data.data
  
        const transformedData = Object.entries(sixMonthsBarChartData).map(
          ([month, categories]) => ({
            month,
            ...categories,
          })
        )
  
        setChartData(transformedData)
        setMetrics(restMetrics)
      } catch (error) {
        handleErrorLogout(error)
      }
    }
    getMetrics()
  }, [])
  

  return (
    <Card className="flex-1 rounded-xl bg-muted/50 md:min-h-min">
      <CardHeader>
        <CardTitle>Bar chart - Multiple</CardTitle>
        <CardDescription>Last 6 Months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            {Object.keys(chartConfig).map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={`var(--color-${key.toLowerCase()})`}
                radius={4}
              />
            ))}
          </BarChart>
        </ChartContainer>
        <CardFooter className="flex flex-col gap-2 text-sm">
        {metrics?.sales && (
  <div className="flex gap-2 font-medium leading-none">
    {metrics.sales.growth >= 0 ? "Trending up" : "Trending down"} by{" "}
    {Math.abs(metrics.sales.growth).toFixed(1)}% this month{" "}
    <TrendingUp
      className={`h-4 w-4 ${
        metrics.sales.growth >= 0 ? "text-green-500" : "text-red-500 rotate-180"
      }`}
    />
  </div>
)}

          <div className="leading-none text-muted-foreground">
            Showing total products delivered by category (last 6 months).
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
