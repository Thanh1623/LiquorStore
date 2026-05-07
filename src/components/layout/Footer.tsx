export function Footer() {
  return (
    <footer className="border-t bg-secondary/50 py-12">
      <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
        <p className="mb-4 text-lg font-semibold text-primary">LiquorStore</p>
        <p>© {new Date().getFullYear()} LiquorStore. All rights reserved.</p>
      </div>
    </footer>
  );
}
