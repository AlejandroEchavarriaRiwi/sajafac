import EditProductForm from "@/components/EditProductForm";

interface Props {
  params: { id: string };
}

export default function EditPage({ params }: Props) {
  return <EditProductForm id={params.id} />;
}
