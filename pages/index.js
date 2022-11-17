import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [folResults, setFolResults] = useState([]);
  const [engResults, setEngResults] = useState([]);

  const fetchFollowers = async () => {
    const url = `/api/insights`;

    const result = await fetch(url).then((res) => res.json());
    setFolResults(result);
  };

  const fetchEngagement = async () => {
    const url = `/api/insights2`;

    const result = await fetch(url).then((res) => res.json());
    setEngResults(result);
  };

  useEffect(() => {
    fetchFollowers();
    fetchEngagement();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.title}>
        Who are the #1 top influencers per category, by followers?
      </div>
      <div>
        {folResults.map((res, i) => (
          <div key={i} className={styles.tabla}>
            <div className={styles.item}>{res.cat}</div>
            <div className={styles.item}>{res.influencerName}</div>
            <div className={styles.item}>{res.followers}</div>
          </div>
        ))}
      </div>
      <div className={styles.title}>
        Who are the #1 top influencers per country, by engagement avg?
      </div>

      <div>
        {engResults.map((res, i) => (
          <div key={i} className={styles.tabla}>
            <div className={styles.item}>{res.cat}</div>
            <div className={styles.item}>{res.influencerName}</div>
            <div className={styles.item}>{res.engagement}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
