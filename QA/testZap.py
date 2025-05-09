from zapv2 import ZAPv2
import time

ZAP_ADDRESS = 'localhost'
ZAP_PORT = '8080'
TARGET = 'http://localhost:4200'

# Initialize ZAP API client
zap = ZAPv2(proxies={'http': f'http://{ZAP_ADDRESS}:{ZAP_PORT}', 'https': f'http://{ZAP_ADDRESS}:{ZAP_PORT}'})

print(f"[+] Accessing target {TARGET}")
zap.urlopen(TARGET)
time.sleep(2)

# Spider scan
print("[+] Spidering the target")
scan_id = zap.spider.scan(TARGET)
while int(zap.spider.status(scan_id)) < 100:
    print(f"Spider progress: {zap.spider.status(scan_id)}%")
    time.sleep(2)

print("[+] Spidering completed")

# Scan SQL Injection, XSS, Input Validation
print("[+] Starting active scan")
ascan_id = zap.ascan.scan(TARGET)
while int(zap.ascan.status(ascan_id)) < 100:
    print(f"Active Scan progress: {zap.ascan.status(ascan_id)}%")
    time.sleep(5)

print("[+] Active Scan completed")

# Generate report
alerts = zap.core.alerts(baseurl=TARGET)

sql_alerts = [a for a in alerts if 'SQL Injection' in a['alert']]
xss_alerts = [a for a in alerts if 'Cross Site Scripting' in a['alert']]
input_alerts = [a for a in alerts if 'Input' in a['alert'] or 'Validation' in a['alert']]

print("\n[!] SQL Injection Alerts:")
for alert in sql_alerts:
    print(f"- {alert['alert']} | URL: {alert['url']}")

print("\n[!] XSS Alerts:")
for alert in xss_alerts:
    print(f"- {alert['alert']} | URL: {alert['url']}")

print("\n[!] Entry Validation Issues:")
for alert in input_alerts:
    print(f"- {alert['alert']} | URL: {alert['url']}")

with open("zap_report.html", "w", encoding='utf-8') as report:
    report.write(zap.core.htmlreport())
    print("\n[+] Report saved as zap_report.html")
