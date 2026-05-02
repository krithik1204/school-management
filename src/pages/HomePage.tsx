import { type FC } from 'react';

const HomePage: FC = () => (
  <section className="p-8 max-w-4xl mx-auto">
    <h2 className="text-4xl font-bold text-slate-900 mb-4">Welcome to School Management</h2>
    <p className="text-lg text-slate-700 leading-relaxed">
      Use the navigation in the top-right to login, view the dashboard, and manage your school.
    </p>
  </section>
);

export default HomePage;
