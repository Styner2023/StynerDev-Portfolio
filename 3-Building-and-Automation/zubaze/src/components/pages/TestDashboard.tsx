import { useEffect } from 'react';
import './test-dashboard.css';

const TestDashboard = () => {
  useEffect(() => {
    // Verification function
    const verifyImplementation = () => {
      const elementsToCheck = [
        { selector: '.developer-header', name: 'Developer Header' },
        { selector: '.sidebar', name: 'Sidebar' },
        { selector: '.main-header', name: 'Main Header' },
        { selector: '.developer-dashboard', name: 'Developer Dashboard' },
        { selector: '.summary-cards', name: 'Summary Cards' },
        { selector: '.projects-chart', name: 'Projects Chart' },
        { selector: '.bottom-section', name: 'Bottom Section' },
        { selector: '.kanban-preview', name: 'Kanban Preview' },
        { selector: '.upcoming-projects', name: 'Upcoming Projects' },
        { selector: '.recent-messages', name: 'Recent Messages' }
      ];

      const results = elementsToCheck.map(item => {
        const element = document.querySelector(item.selector);
        return {
          name: item.name,
          found: !!element
        };
      });

      // Display results in a panel
      displayResults(results);
    };

    const displayResults = (results: { name: string, found: boolean }[]) => {
      // Remove existing panel if it exists
      const existingPanel = document.getElementById('verification-panel');
      if (existingPanel) existingPanel.remove();

      // Create verification panel
      const panel = document.createElement('div');
      panel.id = 'verification-panel';
      panel.className = 'verification-panel';

      panel.innerHTML = `
        <h3>Dashboard Implementation Verification</h3>
        <div id="verification-results">
          ${results.map((item: { name: string, found: boolean }) => `
            <div class="verification-item">
              <span>${item.name}</span>
              <span class="${item.found ? 'status-pass' : 'status-fail'}">
                ${item.found ? '✓ PASS' : '✗ FAIL'}
              </span>
            </div>
          `).join('')}
        </div>
        <div style="margin-top: 15px; font-weight: bold; color: ${results.every((r: { found: boolean }) => r.found) ? '#28a745' : '#dc3545'}">
          ${results.every((r: { found: boolean }) => r.found) ? '🎉 All elements found!' : '⚠️ Some elements missing'}
        </div>
      `;

      document.body.appendChild(panel);
    };

    // Run verification after a short delay to ensure DOM is loaded
    const timer = setTimeout(verifyImplementation, 1000);

    // Cleanup
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="test-container">
      <h1>Dashboard Implementation Test</h1>
      <p>Check the verification panel in the top-right corner for results.</p>
    </div>
  );
};

export default TestDashboard;