import React, { useEffect, useRef, memo, useState } from 'react';
import { Skeleton } from '@mui/material'; // Import Skeleton from Material-UI

function TradingViewWidget({ symbol }) {
  const container = useRef();
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Define script variable outside of setTimeout
    let script;

    // Define a variable to capture container.current
    const currentContainer = container.current;

    // Delay the script insertion to ensure the container is ready
    const timeoutId = setTimeout(() => {
      script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
  "symbols": "${symbol}",
  "chartOnly": false,
  "width": "100%",
  "height": "100%",
  "locale": "en",
  "colorTheme": "light",
  "autosize": true,
  "showVolume": false,
  "showMA": false,
  "hideDateRanges": false,
  "hideMarketStatus": false,
  "hideSymbolLogo": true,
  "scalePosition": "right",
  "scaleMode": "Normal",
  "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
  "fontSize": "10",
  "noTimeScale": false,
  "valuesTracking": "1",
  "changeMode": "price-and-percent",
  "chartType": "area",
  "maLineColor": "#2962FF",
  "maLineWidth": 1,
  "maLength": 9,
  "lineWidth": 2,
  "lineType": 0,
  "dateRanges": [
    "1d|1",
    "1m|30",
    "3m|60",
    "12m|1D",
    "60m|1W",
    "all|1M"
  ]
        }`;
      currentContainer.appendChild(script);

      // Set loading to false once script is loaded
      script.onload = () => {
        setIsLoading(false);
      };
    }, 0);

    // Cleanup function to remove the script and clear the timeout
    return () => {
      if (currentContainer && script) {
        currentContainer.removeChild(script);
      }
      clearTimeout(timeoutId);
    };
  }, [symbol, setIsLoading]); // Include setIsLoading as a dependency

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      {isLoading ? (
        // Render Material-UI Skeleton loader while loading
        <Skeleton variant="rect" width="100%" height="100%" animation="wave" />
      ) : null}
      {!isLoading && (
        <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
      )}
    </div>
  );
}

export default memo(TradingViewWidget);
