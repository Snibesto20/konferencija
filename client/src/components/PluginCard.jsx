import { FaPlus } from "react-icons/fa"

export default function PluginCard({mainColor, secondaryColor, cover, onAdd, id, title, description, selected, Icon }) {
	return (
		<div style={{ borderColor: mainColor }} className={`relative border w-full h-36 ${selected ? "opacity-60 pointer-events-none" : "opacity-100"}`}>
			<div style={{ borderBottomColor: mainColor}} className={`h-1/5 border-b ${cover}`}></div>
			<div className="relative bg-gradient-to-t from-gray-400 to-gray-100 h-4/5 p-2.5">
				<div style={{ borderColor: mainColor, background: 'linear-gradient(to bottom, #f9fafb, #e5e7eb)' }} className="absolute -top-6.5 right-2.5 rounded-4xl w-13 h-13 border p-3">
					<Icon style={{ color: mainColor }} className="w-full h-full" />
				</div>
				<h3 style={{ color: mainColor }} className="font-semibold">{title}</h3>
				<p className="italic text-gray-500">{description}</p>
				<button type="button" style={{ borderColor: mainColor, background: `linear-gradient(to bottom, ${secondaryColor}, ${mainColor})` }} className="flex justify-center absolute bottom-0 left-0 w-full h-10 border cursor-pointer" onClick={() => onAdd(id)}>
					<FaPlus className="text-white h-full" />
				</button>
			</div>
		</div>
	)
}
