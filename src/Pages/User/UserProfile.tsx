import React, { useState, type ChangeEvent } from "react";

interface Transaction {
  id: string;
  date: string;
  type: string;
  amount: string;
  status: "Completed" | "Pending" | "Failed";
}

interface UserData {
  fullName: string;
  email: string;
  phone: string;
  photoUrl?: string;
}

const sampleUserData: UserData = {
  fullName: "Alice Johnson",
  email: "alice.johnson@example.com",
  phone: "+1 555-987-6543",
  photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
};

const sampleTransactions: Transaction[] = [
  {
    id: "TXN100001",
    date: "2024-06-01",
    type: "Purchase",
    amount: "$120.00",
    status: "Completed",
  },
  {
    id: "TXN100002",
    date: "2024-05-28",
    type: "Sale",
    amount: "$250.00",
    status: "Pending",
  },
  {
    id: "TXN100003",
    date: "2024-05-20",
    type: "Purchase",
    amount: "$75.00",
    status: "Failed",
  },
  {
    id: "TXN100004",
    date: "2024-05-15",
    type: "Sale",
    amount: "$300.00",
    status: "Completed",
  },
];

const UserProfile: React.FC = () => {
  const [fullName] = useState(sampleUserData.fullName); // Not editable
  const [email, setEmail] = useState(sampleUserData.email);
  const [phone, setPhone] = useState(sampleUserData.phone);
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(sampleUserData.photoUrl);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState<{ email?: string; phone?: string }>({});

  // Handle photo file selection and preview
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);
      setPhotoUrl(URL.createObjectURL(file));
    }
  };

  // Simple validation
  const validate = () => {
    const errors: { email?: string; phone?: string } = {};
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Invalid email address";
    }
    if (!phone.match(/^\+?[0-9\s\-]{7,15}$/)) {
      errors.phone = "Invalid phone number";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit
  const handleSave = () => {
    if (!validate()) return;

    // TODO: Send updated data to backend/blockchain here
    alert("Profile updated successfully!");

    setIsEditing(false);
    // If photoFile is set, upload it accordingly
  };

  // Reset form to initial data on cancel
  const handleCancel = () => {
    setIsEditing(false);
    setEmail(sampleUserData.email);
    setPhone(sampleUserData.phone);
    setPhotoUrl(sampleUserData.photoUrl);
    setFormErrors({});
    setPhotoFile(null);
  };

  return (
    <div className="min-h-screen bg-green-50 p-6 md:p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-green-900 mb-8">User  Profile</h1>

      <div className="bg-white rounded-lg shadow p-6 md:p-10">
        {/* User Info Section */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-10 mb-10">
          {/* Photo */}
          <div className="flex-shrink-0 mb-6 md:mb-0">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-600 bg-green-100">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="User  profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-green-400 text-6xl font-bold">
                  {fullName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            {isEditing && (
              <label className="mt-3 block text-green-700 cursor-pointer text-sm font-medium hover:underline">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="mb-4">
              <label className="block text-green-700 font-semibold mb-1">Full Name</label>
              <p className="text-green-900 text-lg">{fullName}</p>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-green-700 font-semibold mb-1">
                Email
              </label>
              {isEditing ? (
                <>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                      formErrors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
                  )}
                </>
              ) : (
                <p className="text-green-900 text-lg">{email}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-green-700 font-semibold mb-1">
                Phone
              </label>
              {isEditing ? (
                <>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                      formErrors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-red-600 text-sm mt-1">{formErrors.phone}</p>
                  )}
                </>
              ) : (
                <p className="text-green-900 text-lg">{phone}</p>
              )}
            </div>

            {/* Edit / Save Buttons */}
            <div className="mt-6">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors mr-4"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 rounded-md font-semibold border border-green-600 text-green-600 hover:bg-green-100 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Transactions Section */}
        <section>
          <h2 className="text-2xl font-bold text-green-900 mb-6">Transaction History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow divide-y divide-green-200">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-6 py-3 text-left text-green-700 font-semibold text-sm">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-green-700 font-semibold text-sm">Date</th>
                  <th className="px-6 py-3 text-left text-green-700 font-semibold text-sm">Type</th>
                  <th className="px-6 py-3 text-left text-green-700 font-semibold text-sm">Amount</th>
                  <th className="px-6 py-3 text-left text-green-700 font-semibold text-sm">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-100">
                {sampleTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-green-700">
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  sampleTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-green-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-green-900 font-medium">{tx.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-green-700">{tx.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-green-700">{tx.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-green-700">{tx.amount}</td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap font-semibold ${
                          tx.status.toLowerCase() === "completed"
                            ? "text-green-600"
                            : tx.status.toLowerCase() === "pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {tx.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;