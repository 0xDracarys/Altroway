#!/usr/bin/env node
/**
 * Simple Endpoint Testing Script using Fetch API (Node 18+)
 */

const BASE_URL = "http://localhost:3000";

const ENDPOINTS = [
  // Public Pages
  { path: "/", name: "Home", type: "page" },
  { path: "/jobs", name: "Jobs Listing", type: "page" },
  { path: "/about", name: "About", type: "page" },
  { path: "/terms", name: "Terms", type: "page" },
  { path: "/privacy", name: "Privacy", type: "page" },
  { path: "/documentation", name: "Documentation", type: "page" },
  { path: "/legal-support", name: "Legal Support", type: "page" },
  { path: "/research", name: "Research", type: "page" },
  { path: "/contact", name: "Contact", type: "page" },
  { path: "/help", name: "Help", type: "page" },
  
  // Auth Pages
  { path: "/login", name: "Login", type: "auth" },
  { path: "/register", name: "Register", type: "auth" },
  
  // Protected Pages (will redirect if not authenticated)
  { path: "/dashboard", name: "Dashboard", type: "protected" },
  { path: "/messages", name: "Messages", type: "protected" },
  { path: "/saved-jobs", name: "Saved Jobs", type: "protected" },
  { path: "/profile", name: "Profile", type: "protected" },
  { path: "/profile/edit", name: "Profile Edit", type: "protected" },
  
  // Employer Pages
  { path: "/employer", name: "Employer Dashboard", type: "employer" },
  { path: "/employer/create-job", name: "Create Job", type: "employer" },
  
  // Admin Pages
  { path: "/admin", name: "Admin Panel", type: "admin" },
  { path: "/admin/analytics", name: "Admin Analytics", type: "admin" },
  { path: "/admin/database", name: "Admin Database", type: "admin" },
  { path: "/admin/jobs", name: "Admin Jobs", type: "admin" },
  { path: "/admin/logs", name: "Admin Logs", type: "admin" },
  { path: "/admin/security", name: "Admin Security", type: "admin" },
  { path: "/admin/settings", name: "Admin Settings", type: "admin" },
  { path: "/admin/users", name: "Admin Users", type: "admin" },
  
  // Dynamic Routes
  { path: "/jobs/test-id", name: "Job Detail (Test ID)", type: "dynamic" },
  { path: "/profile/test-id", name: "User Profile (Test ID)", type: "dynamic" },
  { path: "/messages/test-id", name: "Conversation (Test ID)", type: "dynamic" },
  
  // API Routes
  { path: "/api/chat", name: "Chat API", type: "api" },
  { path: "/api/admin/analytics", name: "Admin Analytics API", type: "api" },
  { path: "/api/admin/users/test-id", name: "Admin Users API", type: "api" },
];

let results = {
  passed: 0,
  failed: 0,
  byStatus: {},
  byType: {},
  tests: [],
};

async function testEndpoint(endpoint) {
  try {
    const url = new URL(endpoint.path, BASE_URL);
    const startTime = Date.now();
    
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "User-Agent": "Endpoint-Tester/1.0",
      },
      redirect: "follow",
    });
    
    const responseTime = Date.now() - startTime;
    const statusCode = response.status;
    
    // Count by status code
    if (!results.byStatus[statusCode]) {
      results.byStatus[statusCode] = 0;
    }
    results.byStatus[statusCode]++;
    
    // Count by type
    if (!results.byType[endpoint.type]) {
      results.byType[endpoint.type] = { total: 0, healthy: 0 };
    }
    results.byType[endpoint.type].total++;
    
    // Determine if healthy (2xx or 3xx)
    const isHealthy = statusCode >= 200 && statusCode < 400;
    const status = isHealthy ? "✓ OK" : `⚠ ${statusCode}`;
    
    if (isHealthy) {
      results.passed++;
      results.byType[endpoint.type].healthy++;
    } else {
      results.failed++;
    }
    
    const result = {
      path: endpoint.path,
      name: endpoint.name,
      type: endpoint.type,
      statusCode,
      responseTime,
      isHealthy,
      status,
    };
    
    results.tests.push(result);
    return result;
  } catch (error) {
    const result = {
      path: endpoint.path,
      name: endpoint.name,
      type: endpoint.type,
      statusCode: "ERROR",
      error: error.message,
      isHealthy: false,
      status: `✗ ERROR`,
    };
    
    results.tests.push(result);
    results.failed++;
    
    if (!results.byType[endpoint.type]) {
      results.byType[endpoint.type] = { total: 0, healthy: 0 };
    }
    results.byType[endpoint.type].total++;
    
    return result;
  }
}

async function runAllTests() {
  console.log(`\n🧪 Starting Comprehensive Endpoint Tests`);
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log(`⏱️  Testing ${ENDPOINTS.length} endpoints...\n`);

  // Group endpoints by type
  const byType = {};
  for (const endpoint of ENDPOINTS) {
    if (!byType[endpoint.type]) {
      byType[endpoint.type] = [];
    }
    byType[endpoint.type].push(endpoint);
  }

  // Test each type
  for (const [type, endpoints] of Object.entries(byType)) {
    console.log(`\n📋 ${type.toUpperCase()}`);
    console.log("─".repeat(100));

    for (const endpoint of endpoints) {
      const result = await testEndpoint(endpoint);
      const statusStr = String(result.statusCode).padEnd(5);
      const nameStr = result.name.padEnd(40);
      const timeStr = result.responseTime ? `${result.responseTime}ms` : result.error || "";
      console.log(`${result.status} ${statusStr} ${nameStr} ${timeStr}`);
    }
  }

  // Print Summary
  console.log("\n");
  console.log("═".repeat(100));
  console.log("TEST SUMMARY");
  console.log("═".repeat(100));
  console.log(`✓ Healthy (2xx-3xx): ${results.passed}`);
  console.log(`⚠ Other Status:      ${results.failed}`);
  console.log(`📊 Total Tests:      ${results.passed + results.failed}`);
  console.log(`✅ Success Rate:     ${((results.passed / (results.passed + results.failed)) * 100).toFixed(2)}%`);
  console.log("═".repeat(100));

  // Status code breakdown
  console.log("\n📈 Status Code Distribution:");
  const sortedStatus = Object.entries(results.byStatus)
    .sort(([a], [b]) => a - b);
  for (const [code, count] of sortedStatus) {
    console.log(`   ${code.padEnd(3)} : ${count}`);
  }

  // Type breakdown
  console.log("\n🏷️  Breakdown by Endpoint Type:");
  for (const [type, stats] of Object.entries(results.byType)) {
    const rate = ((stats.healthy / stats.total) * 100).toFixed(0);
    console.log(`   ${type.padEnd(15)} : ${stats.healthy}/${stats.total} (${rate}%)`);
  }

  // Failed endpoints
  if (results.failed > 0) {
    console.log("\n⚠️  Non-2xx Responses:");
    results.tests
      .filter((t) => !t.isHealthy)
      .forEach((t) => {
        console.log(`   ${t.type.padEnd(12)} ${t.statusCode.toString().padEnd(5)} ${t.path}`);
      });
  }

  console.log("\n═".repeat(100) + "\n");
}

runAllTests().catch(console.error);
