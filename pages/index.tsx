import { useEffect, useState } from 'react';
import { Influencer } from 'components/interfaces';
import { fetchData } from 'components/utilesWeb';
import styles from 'styles/Home.module.css';

export default function Home() {
  const [folResults, setFolResults] = useState([]);
  const [engResults, setEngResults] = useState([]);

  const fetchStats = async () => {
    setFolResults(await fetchData(`/api/insights/catfol`));
    setEngResults(await fetchData(`/api/insights/counteng`));
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.title}>
        Who are the #1 top influencers per category, by followers?
      </div>
      <div>
        <div className={styles.header}>
          <div className={[styles.item, styles.bold].join(" ")}>Category</div>
          <div className={[styles.item, styles.bold].join(" ")}>Influencer&apos;s Name</div>
          <div className={[styles.item, styles.right, styles.bold].join(" ")}># Followers</div>
        </div>
        {folResults.map((res: Influencer, i) => (
          <div key={i} className={styles.tabla}>
            <div className={styles.item}>{res.cat}</div>
            <div className={styles.item}>{res.influencerName}</div>
            <div className={[styles.item, styles.right].join(" ")}>{res.followers}</div>
          </div>
        ))}
      </div>

      <div className={styles.title}>
        Who are the #1 top influencers per country, by engagement avg?
      </div>
      <div>
        <div className={styles.header}>
          <div className={[styles.item, styles.bold].join(" ")}>Country</div>
          <div className={[styles.item, styles.bold].join(" ")}>Influencer&apos;s Name</div>
          <div className={[styles.item, styles.right, styles.bold].join(" ")}>Engagement Avg.</div>
        </div>
        {engResults.map((res: Influencer, i) => (
          <div key={i} className={styles.tabla}>
            <div className={styles.item}>{res.cat}</div>
            <div className={styles.item}>{res.influencerName}</div>
            <div className={[styles.item, styles.right].join(" ")}>{res.engagement}</div>
          </div>
        ))}
      </div>
    </div >
  );
}
