import React from 'react';
import styles from '../pages/index.module.css';

export default function Pipeline() {
  return (
    <div className={styles.pipe} aria-label="A product going from a shop photo to approved catalog images">
      <div className={styles.pipeHead}>
        <b>Cut-out knit dress</b>
        <span className={styles.sku}>SKU DR-2291</span>
        <span className={`state state--approved ${styles.pipeState}`}>3 of 3 approved</span>
      </div>
      <div className={styles.pipeBody}>
        <figure className={styles.frame}>
          <div className={`${styles.well} ${styles.scanWell}`}>
            <img src="/img/brand/hanger.webp" alt="Green knit dress on a hanger, a phone photo" />
            <span className={styles.scan} aria-hidden="true" />
            <span className={styles.corners} aria-hidden="true"><i /><i /><i /><i /></span>
          </div>
          <figcaption><b>Shop photo</b><span>Phone, on a hanger</span></figcaption>
        </figure>
        <figure className={`${styles.frame} ${styles.reveal1}`}>
          <div className={styles.well}>
            <img src="/img/brand/still-dress.webp" alt="The dress as a front catalog still life" />
            <span className={styles.score}><i className={styles.dot} />96/100</span>
          </div>
          <figcaption><b>Still life</b><span>Front</span></figcaption>
        </figure>
        <figure className={`${styles.frame} ${styles.reveal2}`}>
          <div className={styles.well}>
            <img src="/img/brand/onmodel.webp" alt="The dress worn by a model, full length" />
            <span className={styles.pill}>Mid-thigh</span>
          </div>
          <figcaption><b>On-model</b><span>Valentina</span></figcaption>
        </figure>
      </div>
      <div className={styles.pipeFoot}>
        <span>Approved, ready to export</span>
        <div className={styles.fila} aria-hidden="true"><span /></div>
      </div>
    </div>
  );
}
