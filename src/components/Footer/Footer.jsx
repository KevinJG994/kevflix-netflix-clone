import React from 'react'

export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-base-300 text-base-content p-10 z-0 relative calc-width">
      <aside className="flex flex-col items-center m-auto">
        <figure>
          <img src="/KevFlix-logo.png" alt="KevFlix Logo" title='KevFlix' className='w-20' />
        </figure>
        <p className='text-primary-color text-center mt-4'>
          KevFlix absolute Cinema.
          <br />
          <span>Copyright © {new Date().getFullYear()} - All right <span className='line-through'>and left</span> reserved.</span>
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  )
}