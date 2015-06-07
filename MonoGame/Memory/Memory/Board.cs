using System;
using System.Collections.Generic;

using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Content;

namespace Memory
{
	public class Board
	{
		#region Fields
		//List of cards
		List <int> mList;
		List <Card> cardList;
		List <Card> flipOverCards;

		//card size
		Vector2 size;
	
		int counter;

		Random rand = new Random ();

		bool clickStarted = false;
		bool buttonReleased = true;

		SpriteFont font;

		int state;

		#endregion

		#region Constructors
		public Board (ContentManager contentManager, List <int> list, Vector2 initialSize)
		{
			// Initialize values trought constructor
			size = initialSize;

			//Initial default values
			state = 0;
			counter = 0;

			//Initialize the lists of the cards

			//Flip over cards list
			flipOverCards = new List<Card> (2);

			//list of ordered cards
			mList = list;
			createOrderedList();
			mList.AddRange(mList);
			shuffleList ();

			//List of object cards
			cardList = new List<Card> ();
			createBoard (contentManager);

			font = contentManager.Load <SpriteFont> ("Arial20");
		}
		#endregion

		public int Count {
			get { return counter;}
		}
		#region Public methods

		public void Update (GameTime gameTime, MouseState mouse)
		{
			if (mouse.LeftButton == ButtonState.Pressed && buttonReleased) {
				clickStarted = true;
				buttonReleased = false;
			} else if (mouse.LeftButton == ButtonState.Released) {
				buttonReleased = true;
				if (clickStarted) {
					clickStarted = false;
					Card selectCard = selectedCard (mouse);
					if (selectCard != null){
						if (!selectCard.FaceUp) {
							selectCard.FlipOver ();
							if (state == 0) {
								state = 1;
								flipOverCards.Add (selectCard);
							} else if (state == 1) {
								state = 2;
								flipOverCards.Add (selectCard);
								counter++;
							} else if (state == 2) {
								state = 1;
								if (flipOverCards [0].Name != flipOverCards [1].Name) {
									flipOverCards [0].FlipOver ();
									flipOverCards [1].FlipOver ();
								}
							flipOverCards.Clear ();
							flipOverCards.Add (selectCard);
							}

						}
					}
				}

			}
			
		}


		public void Draw(SpriteBatch spriteBatch)
		{
			spriteBatch.DrawString (font, "Turns: " + counter.ToString(), new Vector2(GameConstanst.MARGIN_WIDTH_TOP, GameConstanst.MARGIN_HEIGHT_TOP/5), Color.White);
			foreach (Card card in cardList) {
				card.Draw(spriteBatch);
			}
		}
		#endregion

		#region Private methods
		private void createOrderedList (){
			for (int i = 1; i <= GameConstanst.NUM_CARDS; i++) {
				mList.Add(i);
			}
		}

		private void shuffleList (){
			List <int> auxList = new List <int> ();

			while (mList.Count > 0) {
				int index = rand.Next(mList.Count);
				auxList.Add(mList[index]);
				mList.RemoveAt(index);
			}
			mList.AddRange(auxList);
		}

		private void createBoard(ContentManager contentManager){
			Vector2 origin = new Vector2 ((int)size.X / 2 + GameConstanst.MARGIN_WIDTH_TOP, (int)size.Y / 2 + GameConstanst.MARGIN_HEIGHT_TOP);
			Vector2 center = new Vector2 (0, 0);
			//foreach (int card in mList){
			for (int i=0; i < mList.Count; i++){
				int row = (i / GameConstanst.COLUMNS);
				center.X = origin.X + size.X * (i - (GameConstanst.COLUMNS * row));
				center.Y = origin.Y + size.Y * (row);
				cardList.Add(new Card (contentManager, mList[i], center));
			}
		}

		private Card selectedCard (MouseState mouse){

			foreach (Card card in cardList) {
				if (card.DrawRectangle.Contains (mouse.Position)){
					return card;
				}
			}

			return null;
		}
		#endregion
	}
}

