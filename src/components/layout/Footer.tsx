export function Footer() {
  return (
    <footer className="border-t py-8 bg-gray-50">
      <div className="container mx-auto px-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} LiquorStore. All rights reserved.
      </div>
    </footer>
  );
}
