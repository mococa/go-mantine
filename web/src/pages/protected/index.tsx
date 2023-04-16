import { useCheckUserIsLoggedIn } from '_hooks/checkUserIsLoggedIn';
import { Navbar } from '_common/templates/Navbar';
import { MainLayout } from '_common/templates/MainLayout';

export default function Protected() {
  //   useCheckUserIsLoggedIn();

  return (
    <main>
      <MainLayout />
    </main>
  );
}
