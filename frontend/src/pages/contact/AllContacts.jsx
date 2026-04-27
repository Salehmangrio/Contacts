import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import leaf from "../../assets/leaf.png";
import { getContacts, deleteContact } from "../../utills/api.js";
import ConfirmModal from "../../components/ConfirmModal.jsx";

const AllContacts = () => {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // FETCH CONTACTS
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data.data || data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  // DELETE
  const handleDeleteClick = (id) => {
    setContactToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeletingId(contactToDelete);

      const res = await deleteContact(contactToDelete);

      setContacts((prev) =>
        prev.filter((c) => c._id !== contactToDelete)
      );
    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.message ||
        error.message ||
        "Failed to delete contact"
      );
    } finally {
      setDeletingId(null);
      setShowDeleteConfirm(false);
      setContactToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setContactToDelete(null);
  };

  return (
    <div className="relative h-screen text-white overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${leaf})` }}
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-emerald-500/10 blur-3xl" />

      {/* MAIN WRAPPER */}
      <div className="relative z-10 h-full flex flex-col max-w-5xl mx-auto px-6 pt-10 pb-6 md:pb-10">

        {/* HEADER (fixed) */}
        <div className="flex justify-between items-center shrink-0">
          <div>
            <h1 className=" text-xl md:text-4xl font-extrabold text-emerald-300">
              Your Contacts
            </h1>
            <p className="text-gray-400 mt-1 font-light text-xs md:text-xl">
              Manage your saved contacts beautifully
            </p>
          </div>

          <NavLink
            to="create"
            className="px-2 py-0 md:px-5 md:py-2 rounded-2xl font-semibold text-emerald-200 text-center
                 bg-white/10 backdrop-blur-md border border-white/20 text-xs md:text-md tracking-wider"
          >
            Add Contact
          </NavLink>
        </div>

        {/* SCROLLABLE CONTACT AREA */}
        <div className="flex-1 overflow-y-auto py-4 md:py-6 px-0 md:px-2 space-y-4">

          {contacts.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              No contacts found
            </div>
          ) : (
            <div className="grid gap-2 md:gap-4 md:grid-cols-2">

              {contacts.map((c, i) => {
                const initials = c.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase();

                return (
                  <motion.div
                    key={c._id}
                    className="flex items-center justify-between
                         bg-white/10 backdrop-blur-xl
                         border border-white/20 rounded-2xl p-1 md:p-4"
                  >
                    {/* LEFT */}
                    <div
                      className="flex items-center gap-2 md:gap-4 cursor-pointer"
                      onClick={() => navigate(`/contacts/view/${c._id}`)}
                    >
                      <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 font-medium md:font-bold">
                        {c.profileUrl ? (
                          <img src={c.profileUrl} className="h-full w-full object-cover" />
                        ) : (
                          initials
                        )}
                      </div>

                      <div>
                        <h2 className="text-sm md:text-md font-normal md:font-semibold text-white">{c.name}</h2>
                        <p className="text-gray-400 text-xs md:text-sm">{c.contactNum}</p>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-1 md:gap-2 flex-col md:flex-row">
                      <button
                        onClick={() => navigate(`/contacts/edit/${c._id}`)}
                        className=" px-2 md:px-3 py-1 rounded-lg text-sm bg-emerald-500/20 text-emerald-300"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteClick(c._id)}
                        className="px-2 md:px-3 py-1 rounded-lg text-sm bg-red-500/20 text-red-300"
                      >
                        Delete
                      </button>
                    </div>

                  </motion.div>
                );
              })}

            </div>
          )}
        </div>

        {/* FOOTER (fixed logout) */}
        <div className="shrink-0 flex justify-center pt-2 md:pt-4">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="px-6 py-1 md:py-2 rounded-2xl font-semibold
                 bg-red-500/20 text-red-300 border border-red-400/30"
          >
            Logout
          </button>
        </div>

      </div>
      {/* DELETE CONFIRM */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Delete Contact"
        message="Are you sure you want to delete this contact?"
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous={true}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* LOGOUT CONFIRM */}
      <ConfirmModal
        isOpen={showLogoutConfirm}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        isDangerous={true}
        onConfirm={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        onCancel={() => setShowLogoutConfirm(false)}
      />

    </div>
  );
};

export default AllContacts;