import { FaPlus } from "react-icons/fa"

export default function PluginCard(p) {
	return (
		<div style={{ borderColor: p.mainColor }} className="relative border w-full h-36">
			<div style={{ borderBottomColor: p.mainColor, backgroundImage: `url(${p.cover})` }} className="h-1/5 border-b"></div>
			<div className="relative bg-gradient-to-t from-gray-400 to-gray-100 h-4/5 p-2.5">
				<div style={{ borderColor: p.mainColor, background: 'linear-gradient(to bottom, #f9fafb, #e5e7eb)' }} className="absolute -top-6.5 right-2.5 rounded-4xl w-13 h-13 border p-3">
					<p.icon style={{ color: p.mainColor }} className="w-full h-full" />
				</div>
				<h3 style={{ color: p.mainColor }} className="font-semibold">{p.title}</h3>
				<p className="italic text-gray-500">{p.description}</p>
				<button style={{ borderColor: p.mainColor, background: `linear-gradient(to bottom, ${p.secondaryColor}, ${p.mainColor})` }} className="flex justify-center absolute bottom-0 left-0 w-full h-10 border cursor-pointer">
					<FaPlus className="text-white h-full" />
				</button>
			</div>
		</div>
	)
}
