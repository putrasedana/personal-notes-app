import { createContext, useContext, useState, ReactNode } from "react";

interface ActionLoadingContextValue {
  actionLoading: boolean;
  startActionLoading: () => void;
  stopActionLoading: () => void;
}

const ActionLoadingContext = createContext<
  ActionLoadingContextValue | undefined
>(undefined);

export const ActionLoadingProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [actionLoading, setActionLoading] = useState(false);

  const startActionLoading = () => setActionLoading(true);
  const stopActionLoading = () => setActionLoading(false);

  return (
    <ActionLoadingContext.Provider
      value={{ actionLoading, startActionLoading, stopActionLoading }}
    >
      {children}
    </ActionLoadingContext.Provider>
  );
};

export const useActionLoading = () => {
  const context = useContext(ActionLoadingContext);

  if (!context) {
    throw new Error(
      "useActionLoading must be used inside ActionLoadingProvider",
    );
  }

  return context;
};
