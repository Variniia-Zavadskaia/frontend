import { Link, NavLink } from 'react-router-dom'

export function AppFooter() {
    console.log(process.env.NODE_ENV);
    

    return (
        <footer className="app-footer full">
            <NavLink to="about">About</NavLink>

            <p>&copy; 2025 Shotverse from Variniia </p>
            {process.env.NODE_ENV !== 'production' && (
                <div>
                    {import.meta.env.VITE_LOCAL ? (
                        <span className="local-services">Local Services</span>
                    ) : (
                        <span className="remote-services">Remote Services</span>
                    )}
                </div>
            )}
        </footer>
    )
}
