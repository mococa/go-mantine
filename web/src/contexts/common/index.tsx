/* ---------- External ---------- */
import React, {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useState,
} from 'react';

/* ---------- Interfaces ---------- */
interface CommonContextData {
  sidebar_opened: boolean;
  drawer_opened: boolean;

  handleResetCommon: () => void;

  handleToggleDrawer: () => void;
  handleToggleSidebar: () => void;
}

interface Props {
  children: React.ReactNode;
}

export const CommonContext = createContext<CommonContextData>(
  {} as CommonContextData,
);

export const CommonProvider: React.FC<Props> = ({ children }) => {
  /* ---------- States ---------- */
  const [sidebar_opened, setSidebarOpened] = useState<boolean>(false);
  const [drawer_opened, setDrawerOpened] = useState<boolean>(false);

  /* ---------- Callbacks ---------- */
  const handleResetCommon = useCallback(() => {
    setSidebarOpened(false);
    setDrawerOpened(false);
  }, []);

  const handleToggleSidebar = useCallback(() => {
    setSidebarOpened(opened => !opened);
  }, []);

  const handleToggleDrawer = useCallback(() => {
    setDrawerOpened(opened => !opened);
  }, []);

  /* ---------- Memos ---------- */
  const value = useMemo(
    () => ({
      sidebar_opened,
      drawer_opened,

      handleToggleDrawer,
      handleToggleSidebar,
      handleResetCommon,
    }),
    [
      drawer_opened,
      handleResetCommon,
      handleToggleDrawer,
      handleToggleSidebar,
      sidebar_opened,
    ],
  );

  return (
    <CommonContext.Provider value={value}>{children}</CommonContext.Provider>
  );
};

export const useCommon = () => {
  const context = useContext(CommonContext);
  if (!context) {
    throw new Error('Error inside of useCommon');
  }

  return context;
};
