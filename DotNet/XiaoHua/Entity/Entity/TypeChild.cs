/*
insert license info here
*/
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace XiaoHua.Entity
{
	/// <summary>
	///	Generated by MyGeneration using the NHibernate Object Mapping template
	/// </summary>
	[Serializable]
	public sealed  class TypeChild
	{

		#region Private Members
		private bool _isChanged;

		private int _typechildid; 
		private IList<Artcile> _ArtcileList; 
		private TypeRoot _typerootid; 
		private string _typename; 
		private string _extent; 		
		#endregion

		#region Default ( Empty ) Class Constuctor
		/// <summary>
		/// </summary>
		public TypeChild()
		{
			_typechildid = 0; 
			_ArtcileList = new List<Artcile>();
			_typerootid = new TypeRoot(); 
			_typename = String.Empty; 
			_extent = String.Empty; 
		}
		#endregion // End of Default ( Empty ) Class Constuctor


		#region Public Properties
			
		/// <summary>
		/// 
		/// </summary>
		public int TypeChildid
		{
			get { return _typechildid; }
			set
			{
				_isChanged |= ( _typechildid != value ); 
				_typechildid = value;
			}

		}
			
		public IList<Artcile> ArtcileList
		{
			get
			{
				return _ArtcileList;
			}
			set
			{
				_ArtcileList = value;
			}
		}

		/// <summary>
		/// 
		/// </summary>
		public TypeRoot TypeRootid
		{
			get { return _typerootid; }
			set
			{
				_isChanged |= ( _typerootid != value ); 
				_typerootid = value;
			}

		}
			
		/// <summary>
		/// 
		/// </summary>
		public string TypeName
		{
			get { return _typename; }

			set	
			{	
				if(  value != null &&  value.Length > 100)
					throw new ArgumentOutOfRangeException("Invalid value for TypeName", value, value.ToString());
				
				_isChanged |= (_typename != value); _typename = value;
			}
		}
			
		/// <summary>
		/// 
		/// </summary>
		public string Extent
		{
			get { return _extent; }

			set	
			{	
				if(  value != null &&  value.Length > 1073741823)
					throw new ArgumentOutOfRangeException("Invalid value for Extent", value, value.ToString());
				
				_isChanged |= (_extent != value); _extent = value;
			}
		}
			
		/// <summary>
		/// Returns whether or not the object has changed it's values.
		/// </summary>
		public  bool IsChanged
		{
			get { return _isChanged; }
		}
				
		#endregion 
	}
}