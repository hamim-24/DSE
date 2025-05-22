"use client"

import type React from "react"
import { useAppContext } from "../../context/AppContext"
import { TrendingUp, TrendingDown, Calendar } from "lucide-react"

const PointsHistory: React.FC = () => {
  const { pointsTransactions, totalPointsEarned, points } = useAppContext()

  if (pointsTransactions.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-500">কোন পয়েন্ট ট্রানজেকশন নেই</p>
      </div>
    )
  }

  // Group transactions by date
  const groupedTransactions: Record<string, typeof pointsTransactions> = {}

  pointsTransactions.forEach((transaction) => {
    const date = new Date(transaction.timestamp).toLocaleDateString("bn-BD")
    if (!groupedTransactions[date]) {
      groupedTransactions[date] = []
    }
    groupedTransactions[date].push(transaction)
  })

  return (
    <div className="space-y-6">
      {/* Points summary */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-indigo-600 text-white p-4">
          <h3 className="font-semibold text-lg">পয়েন্ট সারসংক্ষেপ</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">বর্তমান পয়েন্ট</p>
              <p className="text-xl font-bold text-indigo-600">{points}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">মোট অর্জিত</p>
              <p className="text-xl font-bold text-green-600">{totalPointsEarned}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">মোট ব্যয়</p>
              <p className="text-xl font-bold text-red-600">{totalPointsEarned - points}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions by date */}
      {Object.entries(groupedTransactions).map(([date, transactions]) => (
        <div key={date} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 p-3 flex items-center">
            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
            <h3 className="font-medium text-gray-700">{date}</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-4 flex items-center justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${transaction.type === "earned" ? "bg-green-100" : "bg-red-100"}`}>
                    {transaction.type === "earned" ? (
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.timestamp).toLocaleTimeString("bn-BD", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <div className={`font-semibold ${transaction.type === "earned" ? "text-green-600" : "text-red-600"}`}>
                  {transaction.type === "earned" ? "+" : "-"}
                  {Math.abs(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default PointsHistory
