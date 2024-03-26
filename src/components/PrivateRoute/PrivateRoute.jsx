export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  // Verificar si el usuario está autenticado como usuario o administrador
  const isAuthenticated = currentUser === 1 || currentUser === 2;

  // Si el usuario está autenticado, permitir el acceso a la ruta protegida
  if (isAuthenticated) {
      return <Outlet />;
  }

  // Si el usuario no está autenticado, redirigirlo a la página de inicio de sesión
  return <Navigate to="/" />;
}

