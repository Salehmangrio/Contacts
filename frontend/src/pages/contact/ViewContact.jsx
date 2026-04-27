import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import leaf from "../../assets/leaf.png";
import { deleteContact, getContacts } from "../../utills/api.js";
import ConfirmModal from "../../components/ConfirmModal.jsx";

const ViewContact = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [contact, setContact] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [fetchingContact, setFetchingContact] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await getContacts();
        const contacts = data.data || data;
        const foundContact = contacts.find(c => c._id === id);
        
        if (foundContact) {
          setContact(foundContact);
          setError(null);
        } else {
          setError("Contact not found");
        }
      } catch (err) {
        console.error("Failed to fetch contact:", err);
        setError("Failed to load contact");
      } finally {
        setFetchingContact(false);
      }
    };

    if (id) {
      fetchContact();
    }
  }, [id]);

  if (fetchingContact) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading contact...
      </div>
    );
  }

  if (error || !contact) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <div className="text-center">
          <p>{error || "No contact found"}</p>
          <button
            onClick={() => navigate("/contacts")}
            className="mt-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg"
          >
            Back to Contacts
          </button>
        </div>
      </div>
    );
  }

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      const res = await deleteContact(contact._id);
      navigate("/contacts");
    } catch (error) {
      console.error(error);
      const errorMessage = error?.response?.data?.message || error.message || "Failed to delete contact";
      setError(errorMessage);
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  }

  const initials = contact.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">

      {/* 🌿 Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${leaf})` }}
      />

      {/* 🌑 Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* ✨ Glow */}
      <div className="absolute inset-0 bg-emerald-500/10 blur-3xl" />

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md p-6
                   bg-white/10 backdrop-blur-xl
                   border border-white/20
                   rounded-3xl
                   shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
      >

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-300 hover:text-emerald-300 mb-4"
        >
          ← Back
        </button>

        {/* AVATAR */}
        <div className="flex justify-center mb-4">
          <div className="h-24 w-24 rounded-full bg-emerald-500/20 
                          flex items-center justify-center
                          text-emerald-300 font-bold text-2xl
                          border border-emerald-400/20 overflow-hidden">

            {contact.profileUrl ? (
              <img
                src={contact.profileUrl}
                alt="profile"
                className="h-full w-full object-cover"
              />
            ) : (
              initials
            )}

          </div>
        </div>

        {/* NAME */}
        <h2 className="text-center text-2xl font-bold text-emerald-300">
          {contact.name}
        </h2>

        {/* NUMBER */}
        <p className="text-center text-gray-300 mt-2 text-sm">
          {contact.contactNum}
        </p>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-6"></div>

        {/* DETAILS */}
        <div className="text-center text-sm text-gray-400 space-y-2">

          <p>📇 Contact Details</p>

          {contact.profileUrl && (
            <a
              href={contact.profileUrl}
              target="_blank"
              className="text-emerald-300 hover:underline block"
            >
              View Profile
            </a>
          )}

        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 mt-6">

          <button
            onClick={() => navigate(`/contacts/edit/${contact._id}`)}
            className="flex-1 bg-emerald-500 hover:bg-emerald-400
                       text-white py-2 rounded-xl font-semibold
                       transition"
          >
            Edit
          </button>

          <button
            onClick={handleDeleteClick}
            disabled={deleting}
            className="flex-1 bg-red-500/20 hover:bg-red-500/30 disabled:opacity-50
                       text-red-300 border border-red-400/20
                       py-2 rounded-xl font-semibold transition"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>

        </div>

      </motion.div>

      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Delete Contact"
        message="Are you sure you want to delete this contact? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous={true}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ViewContact;