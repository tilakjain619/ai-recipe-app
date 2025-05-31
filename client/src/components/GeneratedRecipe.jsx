import React from 'react'

const GeneratedRecipe = ( {recipe} ) => {
    return (
        <div className='border border-zinc-200 rounded-lg px-5 py-4'>
            <h2 className='text-zinc-800 text-lg font-bold md:text-xl'>{recipe.title}</h2>
            <p className='text-zinc-700 mt-1 text-sm md:text-base'>{recipe.description}</p>
            <ul className='capitalize text-sm mt-2 flex flex-wrap gap-1'>
                {
                    recipe.ingredients?.map((ingredient, index) =>(
                        <li className='bg-purple-300 px-3 py-0.5 rounded-2xl' key={index}>{ingredient}</li>
                    ))
                }
            </ul>
            <ul className='grid mt-2 gap-1'>
                <h2 className='text-md md:text-lg font-bold'>Steps:</h2>
                {
                    recipe.steps?.map((step, index) =>(
                        <li className='text-sm md:text-base' key={index}>{index+1}. {step}</li>
                    ))
                }
            </ul>

        </div>
    )
}

export default GeneratedRecipe
