#!/usr/bin/env node
/**
 * Comprehensive Endpoint Testing Script
 * Tests all pages and API endpoints for proper HTTP status codes
 */

const http = require("http");
const https = require("https");

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const isHttps = BASE_URL.startsWith("https");
const client = isHttps ? https : http;

// Define all endpoints to test
const ENDPOINTS_TO_TEST = {
  "Public Pages": [
    { path: "/", method: "GET", expected: [200, 301, 302, 304] },
    { path: "/jobs", method: "GET", expected: [200, 301, 302, 304] },
    { path: "/about", method: "GET", expected: [200, 301, 302, 304] },
    { path: "/terms", method: "GET", expected: [200, 301, 302, 304] },
    { path: "/privacy", method: "GET", expected: [200, 301, 302, 304] },
    { path: "/documentation", method: "GET", expected: [200, 301, 302, 304] },
    { path: "/legal-support", method: "GET", expected: [200, 301, 302, 304] },
    { path: "/research", method: "GET", expected: [200, 301, 302, 304] },
    { path: "/contact", method: "GET", expected: [200, 301, 302, 304] },
    { path: "/help", method: "GET", expected: [200, 301, 302, 304] },
  ],
  "Auth Pages": [
    { path: "/login", method: "GET", expected: [200, 301, 302, 304] },
    { path: "/register", method: "GET", expected: [200, 301, 302, 304] },
    { path: "/auth/callback", method: "GET", expected: [200, 301, 302, 304, 307] },
  ],
  "Protected Pages (May Redirect)": [
    { path: "/dashboard", method: "GET", expected: [200, 301, 302, 303, 307] },
    { path: "/messages", method: "GET", expected: [200, 301, 302, 303, 307] },
    { path: "/saved-jobs", method: "GET", expected: [200, 301, 302, 303, 307] },
    { path: "/profile", method: "GET", expected: [200, 301, 302, 303, 307] },
    { path: "/profile/edit", method: "GET", expected: [200, 301, 302, 303, 307] },
  ],
  "Employer Pages": [
    { path: "/employer", method: "GET", expected: [200, 301, 302, 303, 307] },
    { path: "/employer/create-job", method: "GET", expected: [200, 301, 302, 303, 307] },
  ],
  "Admin Pages": [
    { path: "/admin", method: "GET", expected: [200, 301, 302, 303, 307, 403, 401] },
    { path: "/admin/analytics", method: "GET", expected: [200, 301, 302, 303, 307, 403, 401] },
    { path: "/admin/database", method: "GET", expected: [200, 301, 302, 303, 307, 403, 401] },
    { path: "/admin/jobs", method: "GET", expected: [200, 301, 302, 303, 307, 403, 401] },
    { path: "/admin/logs", method: "GET", expected: [200, 301, 302, 303, 307, 403, 401] },
    { path: "/admin/security", method: "GET", expected: [200, 301, 302, 303, 307, 403, 401] },
    { path: "/admin/settings", method: "GET", expected: [200, 301, 302, 303, 307, 403, 401] },
    { path: "/admin/users", method: "GET", expected: [200, 301, 302, 303, 307, 403, 401] },
  ],
  "Dynamic Pages (May 404)": [
    { path: "/jobs/test-id", method: "GET", expected: [200, 404, 301, 302, 303, 307] },
    { path: "/profile/test-id", method: "GET", expected: [200, 404, 301, 302, 303, 307] },
    { path: "/messages/test-id", method: "GET", expected: [200, 404, 301, 302, 303, 307] },
  ],
  "API Routes": [
    { path: "/api/chat", method: "GET", expected: [200, 405, 401, 403] },
    { path: "/api/admin/analytics", method: "GET", expected: [200, 405, 401, 403] },
    { path: "/api/admin/applications", method: "GET", expected: [200, 405, 401, 403] },
    { path: "/api/admin/users/test-id", method: "GET", expected: [200, 405, 401, 403, 404] },
  ],
};

let results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  tests: [],
};

async function testEndpoint(endpoint) {
  return new Promise((resolve) => {
    const url = new URL(endpoint.path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: endpoint.method,
      headers: {
        "User-Agent": "Endpoint-Tester/1.0",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      timeout: 5000,
    };

    const startTime = Date.now();

    const req = client.request(options, (res) => {
      const responseTime = Date.now() - startTime;
      const isExpected = endpoint.expected.includes(res.statusCode);
      const status = isExpected ? "✓ PASS" : "✗ FAIL";

      const result = {
        path: endpoint.path,
        method: endpoint.method,
        statusCode: res.statusCode,
        expected: endpoint.expected,
        passed: isExpected,
        responseTime: `${responseTime}ms`,
        status,
      };

      results.tests.push(result);

      if (isExpected) {
        results.passed++;
      } else {
        results.failed++;
      }

      resolve(result);
    });

    req.on("error", (error) => {
      const result = {
        path: endpoint.path,
        method: endpoint.method,
        statusCode: "ERROR",
        expected: endpoint.expected,
        passed: false,
        error: error.message,
        status: "✗ FAIL",
      };

      results.tests.push(result);
      results.failed++;

      resolve(result);
    });

    req.end();
  });
}

async function runAllTests() {
  console.log(`\n🧪 Starting Comprehensive Endpoint Tests`);
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log(`⏱️  Timeout: 5000ms per endpoint\n`);

  for (const [category, endpoints] of Object.entries(ENDPOINTS_TO_TEST)) {
    console.log(`\n📋 ${category}`);
    console.log("─".repeat(80));

    for (const endpoint of endpoints) {
      const result = await testEndpoint(endpoint);
      console.log(
        `${result.status} ${endpoint.method.padEnd(6)} ${endpoint.path.padEnd(40)} ${String(result.statusCode).padEnd(4)} (${result.responseTime || result.error || ""})`
      );
    }
  }

  // Print Summary
  console.log("\n\n");
  console.log("═".repeat(80));
  console.log("TEST SUMMARY");
  console.log("═".repeat(80));
  console.log(`✓ Passed:  ${results.passed}`);
  console.log(`✗ Failed:  ${results.failed}`);
  console.log(`⚠ Total:   ${results.passed + results.failed}`);
  console.log(`Pass Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(2)}%`);
  console.log("═".repeat(80));

  // Print failed tests
  if (results.failed > 0) {
    console.log("\n❌ FAILED ENDPOINTS:");
    results.tests
      .filter((t) => !t.passed)
      .forEach((t) => {
        console.log(`  ${t.method} ${t.path}`);
        console.log(`    Got: ${t.statusCode}, Expected: ${t.expected.join(", ")}`);
        if (t.error) console.log(`    Error: ${t.error}`);
      });
  }

  process.exit(results.failed > 0 ? 1 : 0);
}

runAllTests();
