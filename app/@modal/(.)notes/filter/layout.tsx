export default function FilterLayout({
    children,
    sidebar,
}: {
    children: React.ReactNode;
    sidebar: React.ReactNode;
}) {
    return (
        <div>
            <aside>{sidebar}</aside>
            <div>{children}</div>
        </div>
    );
}