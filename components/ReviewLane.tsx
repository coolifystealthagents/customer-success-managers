import reviews from '@/app/data/review-provenance.json';

function Cards() {
  return <>{reviews.records.map((review) => <article className="review-card" key={review.name}>
    <p className="stars" aria-label="Five out of five stars">★★★★★</p><h3>{review.headline}</h3><blockquote>“{review.body}”</blockquote><p><strong>{review.name}</strong><br /><span>{review.detail}</span></p>
  </article>)}</>;
}

export function ReviewLane() {
  return <section className="review-panel" aria-labelledby="reviews-title">
    <p className="eyebrow">StealthAgents reviews</p><h2 id="reviews-title">Support trusted by busy teams.</h2><p className="review-scope">{reviews.scope}</p>
    <div className="review-viewport"><div className="review-track"><Cards /><div className="review-copy" aria-hidden="true"><Cards /></div></div></div>
    <p className="review-source">Five-star reviews reproduced from the <a href={reviews.source} rel="noopener noreferrer">official Stealth Agents homepage</a>. Source verified {reviews.verifiedOn}.</p>
  </section>;
}
