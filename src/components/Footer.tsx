export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{padding: '24px 16px', borderTop: '1px solid #eee', color: '#666', textAlign: 'center'}}>
      © {year} WH. All rights reserved.
    </footer>
  );
}
