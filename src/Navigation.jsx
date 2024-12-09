import { Link, NavLink } from 'react-router-dom';
import React from 'react';

export default function Navigation() {
    const navLinkStyles = ({ isActive }) => ({
        color: isActive ? '#9CA3AF' : 'white',
        textDecoration: 'none',
        fontSize: '1.125rem',
        transition: 'color 0.2s ease'
    });

    return (
        <nav className="flex justify-between items-center px-16 py-6 bg-[#232323]">
            <Link to="/" className="text-2xl font-medium no-underline text-white">
                <span>melo</span>
                <span className="text-blue-400">memo</span>
                <span>.</span>
            </Link>
            <div className="flex gap-12">
                <NavLink 
                    to="/lyrics-log" 
                    style={navLinkStyles}
                    className="hover:text-gray-400"
                >
                    Lyrics Log
                </NavLink>
                <NavLink 
                    to="/songbook" 
                    style={navLinkStyles}
                    className="hover:text-gray-400"
                >
                    Songbook
                </NavLink>
                <NavLink 
                    to="/playlists" 
                    style={navLinkStyles}
                    className="hover:text-gray-400"
                >
                    Playlists
                </NavLink>
                <NavLink 
                    to="/search" 
                    style={navLinkStyles}
                    className="hover:text-gray-400"
                >
                    Search
                </NavLink>
            </div>
        </nav>
    );
}