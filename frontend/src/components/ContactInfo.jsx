// src/components/ContactInfo.jsx
export default function ContactInfo() {
  return (
    <section>
      <div className="info_navbar">
        <svg className="icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.72 11.72 0 003.68.59 1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.26.21 2.47.59 3.68a1 1 0 01-.25 1.01l-2.22 2.1z" />
        </svg>
        <div>
          <p>Llámanos: +56 9 0000 0000</p>
          <p>correo@gmail.com</p>
        </div>
      </div>
    </section>
  );
}
