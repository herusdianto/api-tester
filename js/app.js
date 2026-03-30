/**
 * API Tester - Test Your REST APIs Like Postman
 * 100% Client-side processing
 */

class APITester {
    constructor() {
        this.history = JSON.parse(localStorage.getItem('apiTesterHistory') || '[]');
        this.init();
    }

    init() {
        this.bindTabs();
        this.bindRequestTabs();
        this.bindResponseTabs();
        this.bindBodyTypeToggle();
        this.bindAuthTypeChange();
        this.bindAddRowButtons();
        this.bindSendButton();
        this.bindCopyButtons();
        this.bindDownloadButtons();
        this.bindFormatButton();
        this.bindClearHistory();
        this.initThemeToggle();
        this.loadHistory();
        this.addInitialRows();
    }

    // ==================== Theme Toggle ====================
    initThemeToggle() {
        const themeSwitch = document.getElementById('theme-switch');
        const themeIcon = document.getElementById('theme-icon');

        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        this.updateThemeIcon(themeIcon, savedTheme);

        themeSwitch.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            const newTheme = isDark ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(themeIcon, newTheme);
        });
    }

    updateThemeIcon(iconElement, theme) {
        iconElement.innerHTML = theme === 'dark'
            ? `<svg class="sun-icon" viewBox="0 0 24 24" width="28" height="28"><path d="M12 7a5 5 0 100 10 5 5 0 000-10zM2 13h2a1 1 0 100-2H2a1 1 0 100 2zm18 0h2a1 1 0 100-2h-2a1 1 0 100 2zM11 2v2a1 1 0 102 0V2a1 1 0 10-2 0zm0 18v2a1 1 0 102 0v-2a1 1 0 10-2 0zM5.99 4.58a1 1 0 10-1.41 1.41l1.06 1.06a1 1 0 101.41-1.41L5.99 4.58zm12.37 12.37a1 1 0 10-1.41 1.41l1.06 1.06a1 1 0 101.41-1.41l-1.06-1.06zm1.06-10.96a1 1 0 10-1.41-1.41l-1.06 1.06a1 1 0 101.41 1.41l1.06-1.06zM7.05 18.36a1 1 0 10-1.41-1.41l-1.06 1.06a1 1 0 101.41 1.41l1.06-1.06z"></path></svg>`
            : `<svg class="moon-icon" viewBox="0 0 24 24" width="28" height="28"><path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"></path></svg>`;
    }

    // ==================== Tab Management ====================
    bindTabs() {
        // Request tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active');
            });
        });
    }

    bindRequestTabs() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active');
            });
        });
    }

    bindResponseTabs() {
        document.querySelectorAll('.resp-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.resp-tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.resp-tab-content').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(`resp-${btn.dataset.respTab}-tab`).classList.add('active');
            });
        });
    }

    // ==================== Body Type Toggle ====================
    bindBodyTypeToggle() {
        document.querySelectorAll('input[name="body-type"]').forEach(radio => {
            radio.addEventListener('change', () => {
                const bodyContent = document.getElementById('body-content');
                const formDataEditor = document.getElementById('form-data-editor');
                const requestBody = document.getElementById('request-body');

                if (radio.value === 'none') {
                    bodyContent.classList.add('hidden');
                    formDataEditor.classList.add('hidden');
                } else if (radio.value === 'form') {
                    bodyContent.classList.add('hidden');
                    formDataEditor.classList.remove('hidden');
                } else {
                    bodyContent.classList.remove('hidden');
                    formDataEditor.classList.add('hidden');
                    
                    if (radio.value === 'json') {
                        requestBody.placeholder = '{\n  "key": "value"\n}';
                    } else {
                        requestBody.placeholder = 'Enter raw body content...';
                    }
                }
            });
        });
    }

    // ==================== Auth Type Change ====================
    bindAuthTypeChange() {
        const authType = document.getElementById('auth-type');
        authType.addEventListener('change', () => {
            this.updateAuthFields(authType.value);
        });
        this.updateAuthFields(authType.value);
    }

    updateAuthFields(type) {
        const authFields = document.getElementById('auth-fields');
        authFields.innerHTML = '';

        if (type === 'bearer') {
            authFields.innerHTML = `
                <div class="auth-field">
                    <label for="bearer-token">Token</label>
                    <input type="text" id="bearer-token" placeholder="Enter your bearer token">
                </div>
            `;
        } else if (type === 'basic') {
            authFields.innerHTML = `
                <div class="auth-field">
                    <label for="basic-username">Username</label>
                    <input type="text" id="basic-username" placeholder="Enter username">
                </div>
                <div class="auth-field">
                    <label for="basic-password">Password</label>
                    <input type="password" id="basic-password" placeholder="Enter password">
                </div>
            `;
        } else if (type === 'api-key') {
            authFields.innerHTML = `
                <div class="auth-field">
                    <label for="api-key-name">Key Name</label>
                    <input type="text" id="api-key-name" placeholder="e.g., X-API-Key">
                </div>
                <div class="auth-field">
                    <label for="api-key-value">Key Value</label>
                    <input type="text" id="api-key-value" placeholder="Enter your API key">
                </div>
                <div class="auth-field">
                    <label for="api-key-location">Add to</label>
                    <select id="api-key-location">
                        <option value="header">Header</option>
                        <option value="query">Query Params</option>
                    </select>
                </div>
            `;
        }
    }

    // ==================== Key-Value Editor ====================
    addInitialRows() {
        this.addRow('params-rows');
        this.addRow('headers-rows');
        this.addRow('form-data-rows');
    }

    bindAddRowButtons() {
        document.querySelectorAll('.add-row-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.addRow(btn.dataset.target);
            });
        });
    }

    addRow(containerId) {
        const container = document.getElementById(containerId);
        const row = document.createElement('div');
        row.className = 'kv-row';
        row.innerHTML = `
            <input type="text" class="kv-key" placeholder="Key">
            <input type="text" class="kv-value" placeholder="Value">
            <button class="remove-row-btn" title="Remove">×</button>
        `;

        row.querySelector('.remove-row-btn').addEventListener('click', () => {
            row.remove();
        });

        container.appendChild(row);
    }

    getKeyValuePairs(containerId) {
        const pairs = {};
        document.querySelectorAll(`#${containerId} .kv-row`).forEach(row => {
            const key = row.querySelector('.kv-key').value.trim();
            const value = row.querySelector('.kv-value').value.trim();
            if (key) {
                pairs[key] = value;
            }
        });
        return pairs;
    }

    // ==================== Send Request ====================
    bindSendButton() {
        document.getElementById('send-btn').addEventListener('click', () => this.sendRequest());
        
        // Allow Enter key to send request
        document.getElementById('request-url').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendRequest();
            }
        });
    }

    async sendRequest() {
        const method = document.getElementById('http-method').value;
        let url = document.getElementById('request-url').value.trim();

        if (!url) {
            this.showStatus('Please enter a URL', 'error');
            return;
        }

        // Add protocol if missing
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        // Build query parameters
        const params = this.getKeyValuePairs('params-rows');
        const urlObj = new URL(url);
        Object.entries(params).forEach(([key, value]) => {
            urlObj.searchParams.append(key, value);
        });

        // Build headers
        const headers = this.getKeyValuePairs('headers-rows');

        // Add auth headers
        this.addAuthHeaders(headers);

        // Build request options
        const options = {
            method: method,
            headers: headers
        };

        // Add body for non-GET requests
        if (method !== 'GET' && method !== 'HEAD') {
            const bodyType = document.querySelector('input[name="body-type"]:checked').value;
            
            if (bodyType === 'json') {
                const bodyText = document.getElementById('request-body').value.trim();
                if (bodyText) {
                    try {
                        JSON.parse(bodyText); // Validate JSON
                        options.body = bodyText;
                        headers['Content-Type'] = 'application/json';
                    } catch (e) {
                        this.showStatus('Invalid JSON in request body', 'error');
                        return;
                    }
                }
            } else if (bodyType === 'form') {
                const formData = this.getKeyValuePairs('form-data-rows');
                const formBody = new URLSearchParams();
                Object.entries(formData).forEach(([key, value]) => {
                    formBody.append(key, value);
                });
                options.body = formBody.toString();
                headers['Content-Type'] = 'application/x-www-form-urlencoded';
            } else if (bodyType === 'raw') {
                const bodyText = document.getElementById('request-body').value.trim();
                if (bodyText) {
                    options.body = bodyText;
                }
            }
        }

        // Show loading state
        const sendBtn = document.getElementById('send-btn');
        const originalText = sendBtn.textContent;
        sendBtn.textContent = 'Sending...';
        sendBtn.disabled = true;

        const startTime = performance.now();

        try {
            const response = await fetch(urlObj.toString(), options);
            const endTime = performance.now();
            const duration = Math.round(endTime - startTime);

            // Get response body
            const responseText = await response.text();
            let responseBody = responseText;

            // Try to format JSON
            try {
                const json = JSON.parse(responseText);
                responseBody = JSON.stringify(json, null, 2);
            } catch (e) {
                // Not JSON, keep as is
            }

            // Display response
            document.getElementById('response-body').value = responseBody;
            
            // Display status
            const statusBadge = document.getElementById('status-badge');
            statusBadge.textContent = `${response.status} ${response.statusText}`;
            statusBadge.className = 'status-badge ' + (response.ok ? 'success' : 'error');

            // Display time
            document.getElementById('response-time').textContent = `${duration}ms`;

            // Display size
            const size = new Blob([responseText]).size;
            document.getElementById('response-size').textContent = this.formatBytes(size);

            // Display headers
            this.displayResponseHeaders(response.headers);

            // Save to history
            this.saveToHistory(method, urlObj.toString(), response.status, duration);

            this.showStatus('Request completed!', 'success');
        } catch (error) {
            const endTime = performance.now();
            const duration = Math.round(endTime - startTime);

            document.getElementById('response-body').value = `Error: ${error.message}`;
            document.getElementById('status-badge').textContent = 'Error';
            document.getElementById('status-badge').className = 'status-badge error';
            document.getElementById('response-time').textContent = `${duration}ms`;
            document.getElementById('response-size').textContent = '-';
            document.getElementById('response-headers-list').innerHTML = '<p class="placeholder-text">No headers available</p>';

            this.showStatus(`Request failed: ${error.message}`, 'error');
        } finally {
            sendBtn.textContent = originalText;
            sendBtn.disabled = false;
        }
    }

    addAuthHeaders(headers) {
        const authType = document.getElementById('auth-type').value;

        if (authType === 'bearer') {
            const token = document.getElementById('bearer-token')?.value.trim();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        } else if (authType === 'basic') {
            const username = document.getElementById('basic-username')?.value.trim();
            const password = document.getElementById('basic-password')?.value.trim();
            if (username) {
                headers['Authorization'] = `Basic ${btoa(username + ':' + password)}`;
            }
        } else if (authType === 'api-key') {
            const keyName = document.getElementById('api-key-name')?.value.trim();
            const keyValue = document.getElementById('api-key-value')?.value.trim();
            const location = document.getElementById('api-key-location')?.value;
            
            if (keyName && keyValue && location === 'header') {
                headers[keyName] = keyValue;
            }
        }
    }

    displayResponseHeaders(headers) {
        const container = document.getElementById('response-headers-list');
        container.innerHTML = '';

        if (!headers || headers.entries().next().done) {
            container.innerHTML = '<p class="placeholder-text">No headers available</p>';
            return;
        }

        headers.forEach((value, key) => {
            const item = document.createElement('div');
            item.className = 'header-item';
            item.innerHTML = `
                <span class="header-key">${key}:</span>
                <span class="header-value">${value}</span>
            `;
            container.appendChild(item);
        });
    }

    // ==================== History Management ====================
    saveToHistory(method, url, status, duration) {
        const entry = {
            id: Date.now(),
            method,
            url,
            status,
            duration,
            timestamp: new Date().toISOString()
        };

        this.history.unshift(entry);
        
        // Keep only last 50 entries
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }

        localStorage.setItem('apiTesterHistory', JSON.stringify(this.history));
        this.loadHistory();
    }

    loadHistory() {
        const container = document.getElementById('history-list');
        
        if (this.history.length === 0) {
            container.innerHTML = '<p class="placeholder-text">No requests yet. Send a request to see it here.</p>';
            return;
        }

        container.innerHTML = '';
        
        this.history.forEach(entry => {
            const item = document.createElement('div');
            item.className = 'history-item';
            
            const date = new Date(entry.timestamp);
            const timeStr = date.toLocaleTimeString();
            const dateStr = date.toLocaleDateString();
            
            item.innerHTML = `
                <div class="history-method ${entry.method.toLowerCase()}">${entry.method}</div>
                <div class="history-url">${this.truncateUrl(entry.url)}</div>
                <div class="history-status ${entry.status >= 200 && entry.status < 300 ? 'success' : 'error'}">${entry.status}</div>
                <div class="history-time">${entry.duration}ms</div>
                <div class="history-date">${dateStr} ${timeStr}</div>
                <button class="history-load-btn" data-id="${entry.id}" title="Load this request">Load</button>
            `;
            
            item.querySelector('.history-load-btn').addEventListener('click', () => {
                this.loadFromHistory(entry);
            });
            
            container.appendChild(item);
        });
    }

    loadFromHistory(entry) {
        document.getElementById('http-method').value = entry.method;
        document.getElementById('request-url').value = entry.url;
        this.showStatus('Request loaded from history', 'success');
    }

    truncateUrl(url) {
        if (url.length > 50) {
            return url.substring(0, 50) + '...';
        }
        return url;
    }

    bindClearHistory() {
        document.getElementById('clear-history-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all history?')) {
                this.history = [];
                localStorage.removeItem('apiTesterHistory');
                this.loadHistory();
                this.showStatus('History cleared', 'success');
            }
        });
    }

    // ==================== Utility Functions ====================
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // ==================== Copy Buttons ====================
    bindCopyButtons() {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.target;
                const targetElement = document.getElementById(targetId);

                if (targetElement && targetElement.value) {
                    navigator.clipboard.writeText(targetElement.value).then(() => {
                        const originalText = btn.textContent;
                        btn.textContent = '✓ Copied!';
                        btn.classList.add('copied');
                        setTimeout(() => {
                            btn.textContent = originalText;
                            btn.classList.remove('copied');
                        }, 2000);
                    }).catch(() => {
                        this.showStatus('Failed to copy to clipboard', 'error');
                    });
                } else {
                    this.showStatus('Nothing to copy', 'error');
                }
            });
        });
    }

    // ==================== Download Buttons ====================
    bindDownloadButtons() {
        document.querySelectorAll('.download-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const contentId = btn.dataset.content;
                const filename = btn.dataset.filename || 'response.json';
                const contentElement = document.getElementById(contentId);

                if (contentElement && contentElement.value) {
                    const blob = new Blob([contentElement.value], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    this.showStatus('File downloaded successfully!', 'success');
                } else {
                    this.showStatus('Nothing to download', 'error');
                }
            });
        });
    }

    // ==================== Format JSON Button ====================
    bindFormatButton() {
        document.getElementById('format-btn').addEventListener('click', () => {
            const responseBody = document.getElementById('response-body');
            const text = responseBody.value.trim();
            
            if (!text) {
                this.showStatus('Nothing to format', 'error');
                return;
            }

            try {
                const json = JSON.parse(text);
                responseBody.value = JSON.stringify(json, null, 2);
                this.showStatus('JSON formatted!', 'success');
            } catch (e) {
                this.showStatus('Invalid JSON', 'error');
            }
        });
    }

    // ==================== Status Messages ====================
    showStatus(message, type = 'info') {
        const status = document.getElementById('status');
        status.textContent = message;
        status.className = `status ${type}`;
        status.classList.remove('hidden');

        setTimeout(() => {
            status.classList.add('hidden');
        }, 3000);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new APITester();
    const yearElem = document.getElementById('currentYear');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }
});
