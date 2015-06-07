using System;

using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Input;

namespace Memory
{
	public class Card
	{
		#region Fields
		int card;
		Vector2 center;
		bool faceUp;

		Texture2D faceUpSprite;
		Texture2D faceDownSprite;
		Rectangle drawRectangle = new Rectangle();
		#endregion

		#region Constructors
		public Card (ContentManager contentManager, int card, Vector2 center)
		{
			this.card = card;
			faceUp = false;
			this.center = center;

			LoadContent(contentManager);
		}
		#endregion

		#region Properties
		public Rectangle DrawRectangle
		{
			get { return drawRectangle; }
		}

		public bool FaceUp{
			get { return faceUp;}
		}

		public int Name {
			get { return card;}
		}
		#endregion

		#region Public methods
		private void LoadContent (ContentManager contentManager){
			faceDownSprite = contentManager.Load <Texture2D> ("Back");
			faceUpSprite = contentManager.Load <Texture2D> (card.ToString());
			drawRectangle = new Rectangle ( (int)center.X - faceDownSprite.Width/2 , (int)center.Y - faceDownSprite.Height/2 , faceDownSprite.Width, faceDownSprite.Height);

		}

		public void Update (GameTime gameTime, MouseState mouse){


		}

		public void Draw(SpriteBatch spriteBatch)
		{
			if (faceUp)
			{
				spriteBatch.Draw(faceUpSprite, drawRectangle, Color.White);
			}
			else
			{
				spriteBatch.Draw(faceDownSprite, drawRectangle, Color.White);
			}
		}

		public void FlipOver()
		{
			faceUp = !faceUp;
		}


		#endregion
	}
}

