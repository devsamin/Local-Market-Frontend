import { useState } from "react";
import { Star, X } from "lucide-react";
import { toast } from "react-toastify";

import { api, getErrorMessage } from "../../services/api";


const ReviewModal = ({ orderItem, onClose, onSuccess }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (event) => {
    event.preventDefault(); setLoading(true);
    try { const { data } = await api.post("/reviews/", { order_item: orderItem.id, rating, comment }); toast.success("Thanks for sharing your review."); onSuccess?.(data); onClose(); }
    catch (error) { toast.error(getErrorMessage(error, "Review could not be submitted.")); }
    finally { setLoading(false); }
  };
  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section role="dialog" aria-modal="true" aria-labelledby="review-title" className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl"><button className="icon-button absolute right-4 top-4" onClick={onClose} aria-label="Close"><X /></button><p className="eyebrow">Verified purchase</p><h2 id="review-title" className="mt-2 pr-8 text-2xl font-bold">Review {orderItem.product_name || orderItem.product?.name}</h2><form className="mt-6 space-y-5" onSubmit={submit}><fieldset><legend className="label mb-2">Your rating</legend><div className="flex gap-2">{[1,2,3,4,5].map((value) => <button key={value} type="button" className="rounded-lg p-1" onClick={() => setRating(value)} aria-label={`${value} star rating`}><Star className={value <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300"} /></button>)}</div></fieldset><label className="label block">Your experience<textarea className="field mt-1 min-h-28 w-full" maxLength={2000} value={comment} onChange={(event) => setComment(event.target.value)} placeholder="What should other buyers know?" /></label><button className="btn-primary w-full" disabled={loading}>{loading ? "Submitting…" : "Submit review"}</button></form></section></div>;
};

export default ReviewModal;
