import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom px-4 max-w-3xl">
        <h1 className="heading-1 text-gray-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>

          <h2 className="heading-3 text-gray-900 mt-8 mb-4">Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            When you book a guided trip or contact us through our website, we collect information you provide such as:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Name and contact information (email, phone number)</li>
            <li>Booking details and preferences</li>
            <li>Payment information (processed securely through our payment provider)</li>
            <li>Any messages or communications you send us</li>
          </ul>

          <h2 className="heading-3 text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Process and confirm your trip bookings</li>
            <li>Communicate with you about your trips and inquiries</li>
            <li>Improve our services and website</li>
            <li>Send you updates about Lucky Strips Fly Co. (with your consent)</li>
          </ul>

          <h2 className="heading-3 text-gray-900 mt-8 mb-4">Information Sharing</h2>
          <p className="text-gray-600 mb-6">
            We do not sell, trade, or otherwise transfer your personal information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
          </p>

          <h2 className="heading-3 text-gray-900 mt-8 mb-4">Data Security</h2>
          <p className="text-gray-600 mb-6">
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>

          <h2 className="heading-3 text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Email: luckystripsflyco@gmail.com</li>
            <li>Phone: (276) 732-0517</li>
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
