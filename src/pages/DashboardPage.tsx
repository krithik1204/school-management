import { type FC } from 'react';

const DashboardPage: FC = () => (
  <section className="p-8 max-w-4xl mx-auto">
    <h2 className="text-3xl font-semibold text-slate-900 mb-4">Dashboard</h2>
    <p className="text-slate-700 leading-relaxed">
      You are signed in and can now access protected school management functionality.
    </p>
  </section>
);

export default DashboardPage;
