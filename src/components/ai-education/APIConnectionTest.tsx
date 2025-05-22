"use client"

import type React from "react"
import { useState } from "react"
import { grokAIService } from "../../services/GrokAIService"

const APIConnectionTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  const testConnection = async () => {
    setIsLoading(true)
    setError("")
    setResult("")

    try {
      const response = await grokAIService.getGrokResponse(
        "Hello, can you confirm that the API connection is working?",
        "You are a helpful AI assistant. Please respond with a brief confirmation that the connection is working.",
      )

      setResult(`✅ Connection successful!\n\nResponse: ${response.text}`)
    } catch (err) {
      setError(`❌ Connection failed: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">AI API Connection Test</h3>

      <button
        onClick={testConnection}
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
      >
        {isLoading ? "Testing Connection..." : "Test API Connection"}
      </button>

      {result && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <pre className="text-sm text-green-800 whitespace-pre-wrap">{result}</pre>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        <p>This test verifies that the Google Gemini API is properly configured and accessible.</p>
      </div>
    </div>
  )
}

export default APIConnectionTest
