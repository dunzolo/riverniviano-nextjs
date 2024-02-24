import DashboardLayout from '@/components/layouts/AdminLayout';

Admin.getLayout = (page : any) => (
    <DashboardLayout>{page}</DashboardLayout>
);

export default function Admin() {
    return (
        <div>

            <h1>Admin</h1>
            <ul>
                <li>
                    <a href="admin/create">
                        Crea
                    </a>
                </li>
                <li>
                    <a href="admin/update">
                        Inserisci risultati
                    </a>
                </li>
                <li>
                    <a href="admin/classifica">
                        Classifica
                    </a>
                </li>
            </ul>
        </div>
    )
}

