import toast from "react-hot-toast";

try {
  await getProjects();
} catch {
  toast.error(
    "Unable to load data. Please try again."
  );
}