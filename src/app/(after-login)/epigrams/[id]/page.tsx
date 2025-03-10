export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  return (
    <div>
      상세페이지(id:{id}): /epigrams/{id}
    </div>
  );
}
