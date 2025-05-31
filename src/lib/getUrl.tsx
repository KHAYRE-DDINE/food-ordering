import { useParams } from 'next/navigation';

export default function Page() {
    const params = useParams(); // Returns an object with dynamic route segments
    const { slug } = params; // Destructure the `slug` parameter

    console.log('what' + slug); // Log the value of the `slug` parameter
}