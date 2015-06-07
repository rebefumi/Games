using System;

using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

namespace Pong
{
	public class Score
	{
		#region Fields
		SpriteFont font;
		Vector2 fontPos;
		string output;
		int scoreRed;
		int scoreWhite;

		#endregion

		#region Constructors
		public Score (SpriteFont mfont, Vector2 mfontPos){
			//Initialize the scores to zero
			scoreRed = 0;
			scoreWhite = 0;
		
			//Initialize the sprite to draw the score
			font = mfont;
			fontPos = mfontPos;
		}
		#endregion

		#region Properties

		public int ScoreWhite{ get{ return scoreWhite; } set{ scoreWhite = value;}}

		public int ScoreRed { get{ return scoreRed; } set{ scoreRed = value; }}

		#endregion

		#region Methods

		/// <summary>
		/// Draws the ball
		/// </summary>
		/// <param name="spriteBatch">sprite batch</param>
		public void Draw(SpriteBatch spriteBatch)
		{
			output =  scoreWhite.ToString() + " - " + scoreRed.ToString();

			// Find the center of the string
			Vector2 fontOrigin = font.MeasureString(output) / 2;

			// Draw the string
			spriteBatch.DrawString(font, output, fontPos, Color.White,
				0, fontOrigin, 1.0f, SpriteEffects.None, 1.0f);

		}
		#endregion
	}
}

