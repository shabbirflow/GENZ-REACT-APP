import React, { useState, useEffect } from "react";
import axios from "axios";
import "./table.css";
import NavBar from "./components/NavBar/NavBar";

let videoURL = "https://pub-99108591c26945f880c380bf32c43a20.r2.dev/videodata/";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoIds, setVideoIds] = useState([]);

  function convertToIST(utcTime) {
    const date = new Date(utcTime);
    const istTime = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
    return istTime.toUTCString();
  }

  // Fetch video IDs once on mount
  useEffect(() => {
    const fetchVideoIds = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://23e5-2401-4900-8fca-f2fa-d05c-d057-18a9-bdba.ngrok-free.app/getfolder",
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        setVideoIds(response.data);
      } catch (error) {
        console.error("Error fetching video IDs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideoIds();
  }, []);

  // Fetch main data once on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.thingspeak.com/channels/2506011/feeds.json?results=200"
        );
        setData(response.data.feeds.slice().reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Auto-refresh data every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://api.thingspeak.com/channels/2506011/feeds.json?results=200"
          );
          setData(response.data.feeds.slice().reverse());
        } catch (error) {
          console.error("Error refreshing data:", error);
        }
      };
      fetchData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <NavBar />
      <div className="outer-table">
        <table className="tableSt" style={{ textAlign: "center" }}>
          <thead className="header-row">
            <tr>
              <th style={{ textAlign: "center" }} className="tableTh">
                Location
              </th>
              <th style={{ textAlign: "center" }} className="tableTh">
                Date/Time
              </th>
              <th style={{ textAlign: "center" }} className="tableTh">
                Temperature
              </th>
              <th style={{ textAlign: "center" }} className="tableTh">
                Relative Speed
              </th>
              <th style={{ textAlign: "center" }} className="tableTh">
                Accident Footage
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const videoSrc = videoIds[index]
                ? `${videoURL}${videoIds[index]}/footage.mp4`
                : `https://www.youtube.com/watch?v=jNQXAC9IVRw&pp=0gcJCdgAo7VqN5tD`;

              return (
                <tr className="tableTr" key={item.entry_id}>
                  <td className="tableTd">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${item.field1},${item.field2}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Location
                    </a>
                    <br />
                    ({item.field1}, {item.field2})
                  </td>

                  <td className="tableTd">{convertToIST(item.created_at)}</td>
                  <td className="tableTd">{item.field3}</td>
                  <td className="tableTd">{item.field4}</td>

                  <td className="tableTd">
                    <a href={videoSrc} target="_blank" rel="noreferrer">
                      View Video
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
