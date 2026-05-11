export default function ProfilePage() {
  return (
    <main className="min-h-screen py-24 container mx-auto px-4">
      <h1 className="text-4xl font-serif font-bold mb-8">My Profile</h1>
      <div className="bg-white p-6 rounded-lg border border-gray-100">
        <p className="text-lg"><strong>Name:</strong> John Doe</p>
        <p className="text-lg"><strong>Email:</strong> john@example.com</p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-serif font-bold mb-4">Order History</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-100">
            <p>No orders yet.</p>
        </div>
      </div>
    </main>
  );
}
