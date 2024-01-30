import React, { useEffect, useRef } from 'react';

const Ticker = ({ className }) => {
  const containerRef = useRef();

  useEffect(() => {
    const currentRef = containerRef.current; // Capture the ref value

    // Delay the script injection until after the current call stack clears
    const timeoutId = setTimeout(() => {
      if (currentRef) {
        // Clear any existing content
        currentRef.innerHTML = '';

        // Create script element
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js';
        script.async = true;
        script.type = 'text/javascript';
        script.innerHTML = JSON.stringify({
          "symbols": [
            {
              "proName": "FOREXCOM:SPXUSD",
              "title": "S&P 500"
            },
            {
              "description": "NASDAQ",
              "proName": "NASDAQ:IXIC"
            },
            {
              "description": "FTSE 100",
              "proName": "SPREADEX:FTSE"
            },
            {
              "description": "RUSSELL 2000",
              "proName": "CAPITALCOM:RTY"
            },
            {
              "description": "DAX",
              "proName": "XETR:DAX"
            },
            {
              "description": "DAX",
              "proName": "XETR:DAX"
            }
          ],
          "isTransparent": false,
          "showSymbolLogo": false,
          "colorTheme": "light",
          "locale": "en"
        });

        // Append script to the container
        currentRef.appendChild(script);
      }
    }, 0);

    // Cleanup function to remove script when component unmounts
    return () => {
      clearTimeout(timeoutId);
      if (currentRef) {
        const script = currentRef.querySelector('script');
        if (script) {
          currentRef.removeChild(script);
        }
      }
    };
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
      </div>
    </div>
  );
};

export default Ticker;
