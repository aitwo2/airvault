services:
  - type: web
    name: airvault
    runtime: node
    startCommand: node server.js
    buildCommand: echo "No build needed"
    envVars:
      - key: PORT
        value: 10000
