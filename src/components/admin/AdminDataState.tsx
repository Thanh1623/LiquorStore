import { Button } from '@/components/ui/button';

interface AdminLoadingStateProps {
  label?: string;
}

interface AdminErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function AdminLoadingState({ label = 'Loading data...' }: AdminLoadingStateProps) {
  return (
    <div className="flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-xl border border-amber-100 bg-gradient-to-b from-amber-50/60 to-white p-6 text-center">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-amber-300 border-t-amber-800" />
      <p className="text-sm text-amber-900">{label}</p>
    </div>
  );
}

export function AdminErrorState({
  title = 'Unable to load data',
  message = 'Please try again in a moment.',
  onRetry,
}: AdminErrorStateProps) {
  return (
    <div className="flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-xl border border-rose-200 bg-rose-50/40 p-6 text-center">
      <p className="text-base font-semibold text-rose-700">{title}</p>
      <p className="max-w-md text-sm text-rose-600">{message}</p>
      {onRetry ? (
        <Button variant="outline" className="border-rose-300 text-rose-700 hover:bg-rose-100" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  );
}
