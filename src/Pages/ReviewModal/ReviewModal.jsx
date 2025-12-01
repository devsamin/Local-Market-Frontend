import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config.js/config";
import { toast } from "react-hot-toast";

const ReviewModal = ({ open, onClose, orderItemId, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("access");

      await axios.post(
        `${BASE_URL}/api/reviews/`,
        {
          order_item: orderItemId,
          rating,
          comment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Review added successfully!");
      onSuccess(); // refresh orders
      onClose();   // close modal

    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add Review</h2>

        <label className="block text-sm font-medium">Rating</label>
        <input
          type="number"
          min="1"
          max="5"
          className="w-full border rounded px-3 py-2 mt-1"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <label className="block text-sm font-medium mt-3">Comment</label>
        <textarea
          className="w-full border rounded px-3 py-2 mt-1"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
