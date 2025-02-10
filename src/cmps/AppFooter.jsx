import { Link, NavLink } from 'react-router-dom'

export function AppFooter() {
    
    return (
        <footer className="app-footer full">
          
            <NavLink to="about">About</NavLink>

            <p>&copy; 2025 Shotverse from Variniia </p>

            {import.meta.env.VITE_LOCAL ? (
                <span className="local-services">Local Services</span>
            ) : (
                <span className="remote-services">Remote Services</span>
            )}
        </footer>
    )
}
